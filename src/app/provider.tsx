//Error: Only plain objects, and a few built-ins,can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
//쿼리 클라이언트는 클라이언트 컴포넌트에서만 사용가능하다.
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
