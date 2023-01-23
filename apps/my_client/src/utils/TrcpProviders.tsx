import { useState, ReactNode, FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";

const TrpcProviders: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:2021/trpc",
          // optional
          // headers() {
          // return {
          // authorization: getAuthCookie(),
          // };
          // },
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProviders;
