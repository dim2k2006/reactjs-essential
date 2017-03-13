Todo = React.createClass({
    getInitialState: function() {
        return {
            initialTodoList: [],
            todoList: []
        };
    },

    componentDidMount: function() {
        let localTodoList = JSON.parse(localStorage.getItem('todoList'));

        if (localTodoList) {

            this.setState({
                initialTodoList: localTodoList,
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
            initialTodoList: newTodoList,
            todoList: newTodoList
        });
    },

    onItemRemove: function(item) {
        const itemId = item.id;
        const newTodoList = this.state.todoList.filter(function(item) {
            return item.id !== itemId;
        });

        this.setState({
            initialTodoList: newTodoList,
            todoList: newTodoList
        });
    },

    onItemChange: function(item) {
        item.status = item.status === 'default' ? 'completed' : 'default';

        let newTodoList = this.state.todoList.slice();

        this.setState({
            initialTodoList: newTodoList,
            todoList: newTodoList
        });
    },

    onSort: function(item) {
        const sortType = item.status;
        let newTodoList = [];
        const date = new Date();

        if (sortType === 'all') {

            newTodoList = this.state.initialTodoList;

        } else if (sortType === 'new') {

            newTodoList = this.state.initialTodoList.filter(function(item) {
                let diff = parseInt((date.getTime() - item.id) / 60000);

                return diff < 1;
            });

        } else if (sortType === 'completed') {

            newTodoList = this.state.initialTodoList.filter(function(item) {
                return item.status === 'completed'
            });

        }

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
                                    return <li key={item.id} className="todo__item"><TodoItem id={item.id} text={item.text} status={item.status} onItemRemove={this.onItemRemove.bind(null, item)} onItemChange={this.onItemChange.bind(null, item)} /></li>
                                }, this)
                            }
                        </ul>
                    </div>
                </div>

                <div className="todo__footer">
                    <div className="todo__router">
                        <TodoRouter onSort={this.onSort} />
                    </div>
                </div>
            </div>
        );
    },

    _updateLocalStorage: function() {
        const todoList = JSON.stringify(this.state.initialTodoList);

        localStorage.setItem('todoList', todoList);
    }
});