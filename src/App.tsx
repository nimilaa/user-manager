import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import { Provider } from 'react-redux';
import store from "./app/store.ts";
import Users from "./pages/Users.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);
const App = () => {
    return (
        <Provider store={store}>
                <Users/>
        </Provider>
    )
}

export default App;
