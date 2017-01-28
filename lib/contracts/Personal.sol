pragma solidity ^0.4.2;

import "Actions.sol";

contract Personal {

    //Actions actions;
    mapping (address => bool) regDevice;
    mapping (address => bool) regService;

    function registerDevice(address _deviceId)public {
        regDevice[_deviceId] = true;
    }

    function deregisterDevice(address _deviceId) public {
        regDevice[_deviceId] = false;
    }

    function registerService(address _service) public {
        regService[_service] = true;
    }

    function deregisterService(address _service) public {
        regService[_service] = false;
    }

    function getDevice() public returns (uint) {

    }

    function listDevicesByAction(Actions) public returns (address _deviceId){

    }

    function listServicesByActionForDevice(address deviceId, Actions) public returns(address _service){
        
    }

}
