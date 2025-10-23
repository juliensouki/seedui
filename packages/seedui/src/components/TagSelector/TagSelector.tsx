import { ForwardedRef, forwardRef, useContext, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { Input } from '../Input';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Button } from '../Button';
import { Text } from '../Text';
import { Tag } from '../Tag';
import { ContainerWithLabel } from '../_internal/ContainerWithLabel';

export interface TagSelectorProps {
  placeholder?: string;
  disabled?: boolean;
  inputValidation?: (value: string) => boolean;
  width?: string | number;
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  tags: string[];
  maxTags?: number;
  label?: string;
  buttonLabel?: string;
  className?: string;
  forwardProps?: {
    labelTextProps?: any;
  };
  htmlAttributes?: {
    rootDiv?: any;
  };
}

const defaultProps: TagSelectorProps = {
  placeholder: 'Tags...',
  disabled: false,
  inputValidation: undefined,
  width: 300,
  onAddTag: undefined,
  onRemoveTag: undefined,
  tags: [],
  maxTags: undefined,
  buttonLabel: 'Add',
  label: '',
  forwardProps: {
    labelTextProps: {},
  },
  htmlAttributes: {
    rootDiv: {},
  },
};

const TagSelectorContainer = styled.div<StyledComponentsPrefix<{}>>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing['025'],
}));

const InputContainer = styled.div<StyledComponentsPrefix<{ isFocused?: boolean }>>(({ theme, $isFocused }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.colors.neutral.white,
  padding: theme.spacing['050'],
  borderRadius: theme.borderRadius[100],
  border: `1px solid ${theme.colors.neutral[200]}`,
  gap: '8px',

  ...($isFocused && {
    outline: `2px solid ${theme.colors.primary[300]}`,
    outlineOffset: 1,
    borderColor: theme.colors.primary.default,
  }),
}));

const TagInput = styled(Input)({
  borderRadius: 'unset',
  border: 'unset',
  flex: 1,
  '&:focus': {
    outline: 'unset',
  },
  '& input': {
    paddingRight: '8px !important',
  },
});

const TagsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  marginTop: theme.spacing['075'],
}));

const AddButton = styled(Button)(({ theme }: StyledProps<TagSelectorProps>) => ({
  height: 34,
  flexShrink: 0,
  '&:focus': {
    outline: `1px solid ${theme.colors.primary[600]}`,
    offset: 0,
  },
}));

export const TagSelector = forwardRef<HTMLInputElement, TagSelectorProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const {
      placeholder,
      disabled,
      inputValidation,
      width,
      onAddTag,
      onRemoveTag,
      tags,
      maxTags,
      label,
      className,
      buttonLabel,
      forwardProps,
      htmlAttributes,
    } = getDefaultProps<TagSelectorProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.searchBar?.defaultProps,
      defaultProps,
    });

    const handleAddTag = () => {
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        // Check maxTags limit
        if (maxTags && tags.length >= maxTags) {
          return;
        }
        onAddTag?.(trimmedValue);
        setInputValue('');
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      onRemoveTag?.(tagToRemove);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTag();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const isAddDisabled =
      disabled || !inputValue.trim() || tags.includes(inputValue.trim()) || (maxTags ? tags.length >= maxTags : false);

    return (
      <ContainerWithLabel label={label} forwardProps={forwardProps} htmlAttributes={htmlAttributes} width={width}>
        <TagSelectorContainer className={joinClasses(className)} $customizations={customizations.components?.searchBar}>
          <InputContainer $isFocused={isFocused}>
            <TagInput
              ref={forwardedRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={disabled}
              inputValidation={inputValidation}
              width="100%"
              htmlAttributes={{
                input: {
                  style: {
                    paddingTop: 0,
                    paddingBottom: 0,
                  },
                  onFocus: () => setIsFocused(true),
                  onBlur: () => setIsFocused(false),
                  onKeyPress: handleKeyPress,
                },
              }}
            />

            <AddButton onClick={handleAddTag} disabled={isAddDisabled}>
              <Text style={{ color: 'white' }}>{buttonLabel}</Text>
            </AddButton>
          </InputContainer>

          {tags.length > 0 && (
            <TagsContainer>
              {tags.map((tag, index) => (
                <Tag key={index} removable onRemove={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          )}
        </TagSelectorContainer>
      </ContainerWithLabel>
    );
  },
);

TagSelector.displayName = 'TagSelector';
