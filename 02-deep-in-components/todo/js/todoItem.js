TodoItem = React.createClass({
    render: function() {
        const checked = this.props.status === 'completed' ? 'checked' : '';

        return (
            <div className="todoItem">
                <div className="todoItem__wrapper">
                    <input type="checkbox" className="todoItem__input" id={this.props.id} onChange={this.props.onItemChange} checked={checked} />

                    <label htmlFor={this.props.id} className="todoItem__label">
                        <div className="todoItem__icon"></div>

                        <div className="todoItem__text"> {this.props.text} </div>
                    </label>

                    <div className="todoItem__close" title="Delete item" onClick={this.props.onItemRemove}>+</div>
                </div>
            </div>
        );
    }
});