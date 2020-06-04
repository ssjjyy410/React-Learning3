import { Loading } from '../components';
import Loadable from 'react-loadable'

//懒加载的loadable方法
export default (loader) => {
    return Loadable({
        loader,
        loading:Loading
    });
}
