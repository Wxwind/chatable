declare const process: Process;
declare type Process = { env: Record<string, string> & { EXPO_PUBLIC_GITHUB_CLIENT_ID: string } };
