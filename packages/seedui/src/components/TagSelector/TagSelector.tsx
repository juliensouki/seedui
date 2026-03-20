import { ChangeEvent, ForwardedRef, forwardRef, HTMLAttributes, useContext, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { Input } from '../Input';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Button } from '../Button';
import { Text, TextPropsAndAttributes } from '../Text';
import { Tag } from '../Tag';
import { ContainerWithLabel } from '../_internal/ContainerWithLabel';

/** An input that lets users add and remove tags from a list. */
export interface TagSelectorProps {
  /** Placeholder text for the tag input. */
  placeholder?: string;
  /** Disables the input and add button. */
  disabled?: boolean;
  /** Validation function for the input value. */
  inputValidation?: (value: string) => boolean;
  /** Component width — number (px) or string. */
  width?: string | number;
  /** Called with the tag string when a new tag is added. */
  onAddTag?: (tag: string) => void;
  /** Called with the tag string when a tag is removed. */
  onRemoveTag?: (tag: string) => void;
  /** Current list of tag strings. */
  tags: string[];
  /** Maximum number of tags allowed. */
  maxTags?: number;
  /** Label text displayed above the input. */
  label?: string;
  /** Label for the add button. Defaults to "Add". */
  buttonLabel?: string;
  /** Additional CSS class for the root element. */
  className?: string;
  /** Pass props to internal sub-components like the label text. */
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  /** Access underlying DOM elements (root, inputContainer, input, button, tagsContainer). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    inputContainer?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLInputElement>;
    button?: HTMLAttributes<HTMLButtonElement>;
    tagsContainer?: HTMLAttributes<HTMLDivElement>;
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
  elementProps: {
    root: {},
    inputContainer: {},
    input: {},
    button: {},
    tagsContainer: {},
  },
};

const TagSelectorContainer = styled.div<StyledComponentsPrefix<Record<string, never>>>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
}));

const InputContainer = styled.div<StyledComponentsPrefix<{ isFocused?: boolean }>>(({ theme, $isFocused }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[300],
    padding: theme.spacing(0.5),
    borderRadius: theme.borderRadius(4),
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[500]}`,
    gap: '8px',

    ...(!$isFocused && {
      '&:hover': {
        borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
      },
    }),

    ...($isFocused && {
      outline: `2px solid ${theme.colors.primary[300]}`,
      outlineOffset: 1,
      borderColor: theme.colors.primary.default,
    }),
  };
});

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
  marginTop: theme.spacing(0.75),
}));

const AddButton = styled(Button)(({ theme }: StyledProps<TagSelectorProps>) => ({
  height: 34,
  flexShrink: 0,
  '&:focus': {
    outline: `1px solid ${theme.colors.primary[600]}`,
    offset: 0,
  },
}));

/** An input that lets users build a list of tags by typing and adding them one by one. */
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
      elementProps,
    } = getDefaultProps<TagSelectorProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.tagSelector?.defaultProps,
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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTag();
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const isAddDisabled =
      disabled || !inputValue.trim() || tags.includes(inputValue.trim()) || (maxTags ? tags.length >= maxTags : false);

    return (
      <ContainerWithLabel label={label} forwardProps={forwardProps} elementProps={elementProps} width={width} className="tag-selector-root">
        <TagSelectorContainer className={joinClasses(className)} $customizations={customizations.components?.tagSelector}>
          <InputContainer {...elementProps.inputContainer} $isFocused={isFocused} className={joinClasses('tag-selector-input-container', elementProps?.inputContainer?.className)}>
            <TagInput
              ref={forwardedRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={disabled}
              inputValidation={inputValidation}
              width="100%"
              className="tag-selector-input"
              elementProps={{
                input: {
                  ...elementProps.input,
                  style: {
                    paddingTop: 0,
                    paddingBottom: 0,
                    ...elementProps.input?.style,
                  },
                  onFocus: () => setIsFocused(true),
                  onBlur: () => setIsFocused(false),
                  onKeyDown: handleKeyDown,
                },
              }}
            />

            <AddButton onClick={handleAddTag} disabled={isAddDisabled} className={joinClasses('tag-selector-button', elementProps.button?.className)}>
              <Text style={{ color: 'white' }}>{buttonLabel}</Text>
            </AddButton>
          </InputContainer>

          {tags.length > 0 && (
            <TagsContainer {...elementProps.tagsContainer} className={joinClasses('tag-selector-tags-container', elementProps?.tagsContainer?.className)}>
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
