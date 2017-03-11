TodoRouter = React.createClass({
    render: function() {
        return (
            <div className="todoRouter">
                <div className="todoRouter__wrapper">
                    <div className="todoRouter__content">
                        <ul className="todoRouter__list">
                            <li className="todoRouter__item">
                                <a href="#" className="todoRouter__link todoRouter_state_active">All</a>
                            </li>
                            <li className="todoRouter__item">
                                <a href="#" className="todoRouter__link">New</a>
                            </li>
                            <li className="todoRouter__item">
                                <a href="#" className="todoRouter__link">Completed</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});