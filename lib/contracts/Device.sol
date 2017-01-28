pragma solidity ^0.4.2;

//import "Actions.sol";

contract Device {

    address public owner;
    //Actions[] actionsTypes;
    //string[] public actionsTypes;
    mapping (string => bool) actionsEnabled;

    //by default all actions are disabled
    function Device(){
        owner = msg.sender;
        actionsEnabled["Toggle"] = false;
        actionsEnabled["Text"] = false;
    }

    // TODO :  onlyOwner modifier or not ?
    function setOwner(address _owner) onlyOwner public {
        owner = _owner;
    }

    function enableAction(string _action) public{
        actionsEnabled[_action] = true;
    }

    /*
        function addActionType(Actions _action) public {
            actionsTypes.push(_action);
        }
    */
    //note : return of array of array is not implemented in EVM yet, return (string[]) doesn't work
    /*
    function getSupportedActions(string _action) onlyOwner returns(bool){
        return actionsEnabled[_action];
    }
    */
    /*
    function addActionType(string _action) public {
        actionsTypes.push(_action);
    }
    */

    function isToggleAble() public returns(bool){
        return actionsEnabled["Toggle"];
    }

    function isTextAble() public returns(bool){
        return actionsEnabled["Text"];
    }

    modifier onlyOwner {
        if (msg.sender == owner) _;
    }

}
