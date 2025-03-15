import {Provider} from 'react-redux';
import store from "./app/store.ts";
import Users from "./pages/Users.tsx";
import ThemeProvider from "@/providers/ThemeProvider.tsx";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Users/>
            </ThemeProvider>
        </Provider>
    )
}

export default App;
