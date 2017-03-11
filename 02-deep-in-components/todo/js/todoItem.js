TodoItem = React.createClass({
    render: function() {
        return (
            <div className="todoItem">
                <div className="todoItem__wrapper">
                    <input type="checkbox" className="todoItem__input" id={this.props.id}/>

                    <label htmlFor={this.props.id} className="todoItem__label">
                        <div className="todoItem__icon"></div>

                        <div className="todoItem__text"> {this.props.text} </div>
                    </label>

                    <div className="todoItem__close" title="Delete item">+</div>
                </div>
            </div>
        );
    }
});