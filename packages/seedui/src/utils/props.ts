export const getDefaultProps: <T>({
  providedProps,
  globalDefaultProps,
  defaultProps,
}: {
  providedProps: T;
  globalDefaultProps?: Partial<T>;
  defaultProps: Partial<T>;
}) => Required<T> = ({ providedProps, globalDefaultProps = {}, defaultProps }) => {
  return {
    ...defaultProps,
    ...globalDefaultProps,
    ...providedProps,
  } as Required<typeof providedProps>;
};
