Todo = React.createClass({
    getInitialState: function() {
        return {
            todoList: []
        };
    },

    componentDidMount: function() {
        let localTodoList = JSON.parse(localStorage.getItem('todoList'));

        if (localTodoList) {

            this.setState({
                todoList: localTodoList
            })

        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    onItemAdd: function(item) {
        const newTodoList = this.state.todoList.slice();

        newTodoList.unshift(item);

        this.setState({
            todoList: newTodoList
        });
    },

    onItemRemove: function(item) {
        const itemId = item.id;
        const newTodoList = this.state.todoList.filter(function(item) {
            return item.id !== itemId;
        });

        this.setState({
            todoList: newTodoList
        });
    },

    render: function() {
        return (
            <div className="todo">
                <div className="todo__wrapper">
                    <div className="todo__header">
                        <div className="todo__field">
                            <TodoField onItemAdd={this.onItemAdd} />
                        </div>
                    </div>

                    <div className="todo__content">
                        <ul className="todo__list">
                            {
                                this.state.todoList.map(function(item) {
                                    return <li key={item.id} className="todo__item"><TodoItem id={item.id} text={item.text} onItemRemove={this.onItemRemove.bind(null, item)} /></li>
                                }, this)
                            }
                        </ul>
                    </div>
                </div>

                <div className="todo__footer">
                    <div className="todo__router">
                        <TodoRouter />
                    </div>
                </div>
            </div>
        );
    },

    _updateLocalStorage: function() {
        const todoList = JSON.stringify(this.state.todoList);

        localStorage.setItem('todoList', todoList);
    }
});