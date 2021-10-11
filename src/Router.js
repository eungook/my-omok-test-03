import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import App from './App';
import Test from './Test';
import Create from './Create';
import Room from './Room';
import Join from './Join';
import NotFound from './NotFound';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/test">
					<Test />
				</Route>
				<Route path="/create">
					<Create />
				</Route>
				<Route path="/room/:roomKey">
					<Room />
				</Route>
				<Route path="/join/:roomKey">
					<Join />
				</Route>
				<Route exact path="/">
					<App />
				</Route>
				<Route Path="/404">
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;