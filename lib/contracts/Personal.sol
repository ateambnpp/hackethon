pragma solidity ^0.4.2;

contract Personal {
//list of devices owned : address of smart contracts
//add/remove a device
//add/remove services

//mapping between service and device, with the actions
//getConsumers(action, service) return device (one or more --> array of addresses smart contracts)



    address[] ownedDevices;
    mappingServiceConsumer mp;
    address[]  ret;

    function addDevice(address _device) public {
        ownedDevices.push(_device);
    }
    function removeDevice(address _device) {
        for (uint i = 0; i < ownedDevices.length; i++){
            if (ownedDevices[i] == _device) {
                ownedDevices[i] = ownedDevices[ownedDevices.length-1];
                delete ownedDevices[ownedDevices.length -1];
            }
        }
    }

    struct mappingServiceConsumer {
        address device;
        address service;
        string action;
    }

    mappingServiceConsumer[] public mapConsumers;

    function addConsumer(address _device, address _service, string _action) public {
        mp = mappingServiceConsumer({device:_device, service:_service, action:_action});
        mapConsumers.push(mp);
    }

    function removeConsumer(address _device, address _service, string _action) public {
        uint index = 6666;

        for(uint i; i < mapConsumers.length; i++){
            if ((stringsEqual(mapConsumers[i].action, _action)) && (mapConsumers[i].service == _service) && (mapConsumers[i].device == _device)){
                index = i;
                break;
            }
        }
        // remove by index
        if (index != 6666){
            mapConsumers[index] = mapConsumers[mapConsumers.length-1];
            delete mapConsumers[mapConsumers.length-1];
        }
    }

    function getConsummer(string _action, address _service) public returns (address[] _devices){
        delete  ret;
        for(uint i; i < mapConsumers.length; i++){
            if ((stringsEqual(mapConsumers[i].action, _action)) && (mapConsumers[i].service == _service)){
                ret.push(mapConsumers[i].device);
            }
        }
        return ret;
    }

    function test() returns (address[]){

    }

    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        // @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
            if (a[i] != b[i])
                return false;
        return true;
    }
}
