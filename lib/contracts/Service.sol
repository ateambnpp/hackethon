pragma solidity ^0.4.2;

import "Actions.sol";


// several services for several devices can be attached
// each inputs / outputs availabilities are coded as a uint
contract Service {

    uint[] inputs;
    uint[] outputs;

    enum serviceInputType { Toggle, Text }

    //function getInputType() returns () {}

    function getInputIndex(uint _index) public returns(uint){
        return inputs[_index];
    }

    function getInputSize() public returns(uint){
        return inputs.length;
    }

    function removeInput(uint _index) notOutOfRange(_index, inputs) {

    }

    function getOutputIndex(uint _index) notOutOfRange(_index, outputs) public returns(uint){
        return outputs[_index];
    }

    function removeInputIndex(uint _index) notOutOfRange(_index, inputs) {
        inputs[_index] = inputs[inputs.length - 1];
        delete inputs[inputs.length-1];
    }

    function removeOutputIndex(uint _index) notOutOfRange(_index, outputs){
        outputs[_index] = outputs[outputs.length - 1];
        delete outputs[outputs.length-1];
    }

    function Service(){}

    function getServiceType() public returns (uint){}

    modifier notOutOfRange(uint i, uint[] t){
        if (i < t.length) _;
    }

}


// panic service
// serviceType for boolean is "1"
contract ServiceBoolean is Service {
    bool public state;
    string public data;
    string public apicall;
    uint public serviceType;

    function DeviceBoolean(string _apicall){
        apicall = _apicall;
        serviceType = 1;
    }

    function getServiceType() public returns (uint){
        return serviceType;
    }

    function getState() public returns (bool){
        return state;
    }

    function getData() public returns (string){
        return data;
    }

    function setState(bool _state, string _data) public {
        state = _state;
        data = _data;
    }
}
