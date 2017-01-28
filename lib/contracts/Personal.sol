pragma solidity ^0.4.2;

import "Actions.sol";
import "Device.sol";

contract Personal {


//list of devices owned : address of smart contracts
//add/remove a device
//add/remove services

//mapping between service and device, with the actions
//getConsumers(action, service) return device (one or more --> array of addresses smart contracts)

    address[] ownedDevices;
    mappingServiceConsumer mp;

    function addDevice(address _device) public {

    }
    function removeDevice(address _device) {

    }

    struct mappingServiceConsumer {
        address device;
        address service;
        string action;
    }

    mappingServiceConsumer[] mapConsumers;

    function addConsumer(address _device, address _service, string _action) public {
        mp = mappingServiceConsumer({device:_device, service:_service, action:_action});
        mapConsumers.push(mp);
    }

    function removeConsumer(address _device, address _service, string _action) public {
        int index = -1;

        for(int i; i < mapConsumers.length; i++){
            if ((mapConsumers[i].action == _action) && (mapConsumers[i].service == _service) && (mapConsumers[i].device == _device)){
                index = i;
                break;
            }
        }
        // remove by index
        if (index != -1){
            mapConsumers[index] = mapConsumers[mapConsumers.length-1];
            delete mapConsumers[mapConsumers.length-1];
        }
    }

    function getConsummer(string _action, address _service) public returns (address[] _devices){
        address[] memory ret;
        for(uint i; i < mapConsumers.length; i++){
            if ((mapConsumers[i].action == _action) && (mapConsumers[i].service == _service)){
                ret.push(mapConsumers[i].device);
            }
        }
        return ret;
    }

    function test() returns (address[]){

    }
}
