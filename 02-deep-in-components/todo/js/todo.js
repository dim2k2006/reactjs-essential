Todo = React.createClass({
    getInitialState: function() {
        return {
            todoList: [
                {
                    id: 0,
                    text: 'Test item 0',
                    status: 'new'
                },
                {
                    id: 1,
                    text: 'Test item 1',
                    status: 'new'
                }
            ]
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

    render: function() {
        return (
            <div className="todo">
                <div className="todo__wrapper">
                    <div className="todo__header">
                        <div className="todo__field">
                            <TodoField />
                        </div>
                    </div>

                    <div className="todo__content">
                        <ul className="todo__list">
                            {
                                this.state.todoList.map(function(item) {
                                    return <li key={item.id} className="todo__item"><TodoItem id={item.id} text={item.text} /></li>
                                })
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
    }
});