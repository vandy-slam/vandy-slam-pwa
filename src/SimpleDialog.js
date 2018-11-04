import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const labelOptions = ['Bathroom', 'Exit', 'Available'];
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Select Label</DialogTitle>
                <div>
                    <List>
                        {labelOptions.map(label => (
                            <ListItem button onClick={() => this.handleListItemClick(label)} key={label}>
                                <ListItemText primary={label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func,
    pos: PropTypes.any
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
    state = {
        open: false,
        selectedValue: labelOptions[0],
    };

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });

    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
        this.props.onChange(this.props.pos,value)
    };

    render() {
        return (
            <div>
                <Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography>
                <br />
                <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default SimpleDialogDemo;