pragma solidity ^0.4.2;

contract Service {

    mapping (string => bool) mInputs;
    mapping (string => bool) mOutputs;

    string name;
    string id;

    function enableInput(string _actionInput) public {
        mInputs[_actionInput] = true;
    }

    function disabelInput(string _actionInput) public {
        mInputs[_actionInput] = false;
    }

    function enableOutput(string _actionOutput) public {
        mOutputs[_actionOutput] = true;
    }

    function disabelOutput(string _actionOutput) public {
        mOutputs[_actionOutput] = false;
    }

}

contract Device is Service {
    address public owner;

    function Device(){
        owner = msg.sender;
    }

    function setOwner(address newOwner) public {
        owner = newOwner;
    }
}
