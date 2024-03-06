import { NavLink } from 'react-router-dom';
import { menuitems } from '../../framework/utils/menuitems';

const Sidebar = () => {
    return (
        <div className='flex flex-col w-1/6'>
            <h1>LOGO GCODE</h1>
            {menuitems.map((item, index) => {
                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        className='text-green-600'>
                        <span>{item.title}</span>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
