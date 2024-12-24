import { Provider } from "@/components/ui/provider";
// global css
import "../../styles/globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});
export default async function RootLayout({ children }) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<NextIntlClientProvider messages={messages}>
					<Provider>{children}</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
