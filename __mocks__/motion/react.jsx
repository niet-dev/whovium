export const mockedAnimate = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const motion = { div: ({ children, whileHover, ...rest }) => (
  <div {...rest}>
      {children}
  </div>
)};

export const useAnimate = jest.fn(() => [jest.fn(), mockedAnimate]);
