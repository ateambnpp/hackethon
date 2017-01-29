app.directive('servicedevice', function($window) {
    return {
        restrict: 'EA',
        template: '<div id="cy"></div>',
        scope: { removeLink: '&', data: '=data' },
        link: function (scope, elem, attrs) {

            scope.$watch("data", function (n) {
                if (n) {
                    render(n.service, n.devices, n.edges);
                }
            });

            function render(service, devices, edges)  {
                if (!devices) {
                    return;
                }
                devices = devices || [];
                service = service || {};
                edges = edges || {};
                console.log(devices);
                var rawSvg = elem.find('#cy');
                var cyElem = rawSvg[0];

                var nodes = [];

                nodes.push({
                    data: {
                        id: service.id,
                        name: service.name,
                    },
                    classes: "service", position: { x: 400, y: 0}
                });
                var xpos = 100;
                var actionNodes = service.actions.map(function (action) {
                    xpos = xpos + 150;
                    return {
                        data: {
                            id: service.id + ":" + action,
                            name: action
                        }, classes: "action", parent: service.id,
                        position: {x: xpos, y: 100}
                    };
                });

                nodes = nodes.concat(actionNodes);
                xpos = 0;
                var deviceNodes = devices.map(function (item) {
                    xpos = xpos + 150;
                    item.xpos = xpos;
                    return {
                        data: {
                            id: item.id,
                            name: item.name
                        }, classes: "device", position: { x: xpos, y: 350}
                    };

                });

                nodes = nodes.concat(deviceNodes);
                for (var i = 0; i < devices.length; i++) {
                    var device = devices[i];

                    xpos = device.xpos;
                    for (var j = 0; j < device.actions.length; j++) {
                        var item = device.actions[j];
                        nodes.push({
                            data: {
                                id: device.id + ":" + item,
                                    name: item
                            }, classes: "action",
                            parent: device.id, position: { x: xpos, y: 300 }
                        });
                    }
                }

               // console.log(cyElem);
                var cy = $window.cy = cytoscape({
                    container: cyElem,
                    boxSelectionEnabled: true,
                    autounselectify: true,
                    layout: {
                        name: 'preset',
                        padding: 10,
                        randomize: false,
                        locked: true
                    },
                    style: [
                        {
                            selector: 'node',
                            style: {
                                'content': 'data(name)',
                                'text-opacity': 0.5,
                                'text-valign': 'center',
                                'text-halign': 'right',
                                'background-color': '#11479e',
                                'font-size': '1em'
                            }
                        },
                        {
                            selector: 'node.service',
                            style: {
                                'content': 'data(name)',
                                'text-opacity': 0.5,
                                'text-valign': 'top',
                                'text-halign': 'center',
                                'background-color': '#ff33ee',
                                'font-size': '1em',
                                'position': 'absolute',
                                'top': "0",
                                'left': "400"
                            }
                        },
                        {
                            selector: 'node.device',
                            style: {
                                'content': 'data(name)',
                                'text-opacity': 0.5,
                                'text-valign': 'bottom',
                                'text-halign': 'center',
                                'background-color': 'orange',
                                'font-size': '1em',
                                'position': 'absolute',
                                'top': "0",
                                'left': "400"
                            }
                        },
                        {
                            selector: 'node.action',
                            style: {
                                'content': 'data(name)',
                                'text-opacity': 0.5,
                                'text-valign': 'center',
                                'text-halign': 'right',
                                'background-color': '#00ffee',
                                'font-size': '0.5em',
                                'font-weight': 'bold',
                                'border': "14px solid black"
                            }
                        },
                        {
                            selector: 'edge',
                            style: {
                                'width': 4,
                                'target-arrow-shape': 'triangle',
                                'line-color': '#9dbaea',
                                'target-arrow-color': '#9dbaea',
                                'curve-style': 'bezier'
                            }
                        },
                        {
                            selector: 'edge.deviceLink',
                            style: {
                                'width': 1,
                                'target-arrow-shape': 'none',
                                'line-color': '#aeaeae',
                                'target-arrow-color': '#9dbaea',
                                'curve-style': 'bezier'
                            }
                        }
                    ],
                    elements: {
                        nodes: nodes,
                        edges: edges
                    },
                    addClass: 'data(class)'
                });
                cy.on('tap', 'edge', function (event, f, b) {
                    if (event.cyTarget !== cy) {

                        var obj = event.cyTarget;

                        var result = window.confirm("Do you want to delete this link?");
                        if (result === true) {
                            var edge = obj.json();
                            var address = edge.data.target.split(":")[0];
                            scope.$parent.removeLink({address: address});
                        }

                    }
                });
            }
        }
    };
});