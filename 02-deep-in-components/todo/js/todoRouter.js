TodoRouter = React.createClass({
    getInitialState: function() {
        return {
            list: [
                {
                    id: 0,
                    text: 'All',
                    isActive: true
                },
                {
                    id: 1,
                    text: 'New',
                    isActive: false
                },
                {
                    id: 2,
                    text: 'Completed',
                    isActive: false
                }
            ]
        };
    },

    handleClick: function(clickedItem) {
        clickedItem.isActive = true;

        const newList = this.state.list.slice();

        newList.forEach(function(item) {
            if (item.id !== clickedItem.id) {
                item.isActive = false;
            }
        });

        this.props.onSort(clickedItem);

        this.setState({
            list: newList
        });
    },

    render: function() {
        return (
            <div className="todoRouter">
                <div className="todoRouter__wrapper">
                    <div className="todoRouter__content">
                        <ul className="todoRouter__list">
                            {
                                this.state.list.map(function(item) {
                                    const isActive = item.isActive ? 'todoRouter_state_active' : '';
                                    const dynamicClassName = 'todoRouter__link ' + isActive;

                                    return <li key={item.id} className="todoRouter__item"><div className={dynamicClassName} onClick={this.handleClick.bind(null, item)}> {item.text} </div></li>;
                                }, this)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});