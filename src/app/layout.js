import { Provider } from "@/components/ui/provider";
// global css
import "../../styles/globals.css";

export default function RootLayout({ children }) {
	return (
		<html suppressHydrationWarning>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
