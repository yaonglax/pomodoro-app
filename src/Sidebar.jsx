import './styles/Sidebar.css'


const Sidebar = ({ button1, button2, button3 }) => {
    return (
        <div className="sidebar">
            {button1}
            {button2}
            <button className='sidebar__button'>3</button>
        </div>
    );
};

export default Sidebar;
