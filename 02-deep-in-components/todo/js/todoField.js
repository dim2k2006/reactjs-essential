TodoField = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleChange: function(event) {
        const value = event.target.value;

        this.setState({
            text: value
        })
    },

    handlePress: function(event) {
        if (event.charCode == 13) {

            const newItem = {
                id: Date.now(),
                text: this.state.text,
                status: 'default'
            };

            this.props.onItemAdd(newItem);

            this.setState({
                text: ''
            });

        }
    },

    render: function() {
        return (
            <div className="todoField">
                <input type="text" className="todoField__input" placeholder="What you need to do" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handlePress}/>
            </div>
        );
    }
});