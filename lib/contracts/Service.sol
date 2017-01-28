pragma solidity ^0.4.2;

import "Actions.sol";

contract Service {
    Actions[] inputs;
    Actions[] outputs;

    function Device(){

    }

    function getInputs() public returns (Actions[]){
        return inputs;
    }

    function getOutputs() public returns (Actions[]){
        return outputs;
    }
    
}
