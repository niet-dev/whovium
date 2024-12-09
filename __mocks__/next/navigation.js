export const mockedQuery = "test";
export const mockedPathname = "/mocked-pathname";
export const routerReplaceMock = jest.fn();

export const useRouter = jest.fn(() => ({ replace: routerReplaceMock }));
export const useSearchParams = jest.fn(
  () => new URLSearchParams({ query: mockedQuery, page: 2 }),
);
export const usePathname = jest.fn(() => mockedPathname);
