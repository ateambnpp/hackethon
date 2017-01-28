app.directive('servicedevice', function($window) {
    return {
        restrict: 'EA',
        template: '<div id="cy"></div>',
        link: function (scope, elem, attrs) {

            var rawSvg = elem.find('#cy');
            var cyElem = rawSvg[0];

            var devices = scope[attrs.devices];
            var service = scope[attrs.service];


            var nodes = [];

            nodes.push({
                data: {
                    id: service.name,
                }
            });

            var actionNodes = service.actions.map(function (action) {
                return {
                    data: {
                        id: action
                    }
                };
            });

            nodes = nodes.concat(actionNodes);

            var edges = actionNodes.map(function (an) {
                return {
                    data: {
                        source: service.name,
                        target: an.data.id
                    }
                };
            });

            function test()  {
               // console.log(cyElem);
                var cy = $window.cy = cytoscape({
                    container: cyElem,
                    boxSelectionEnabled: true,
                    autounselectify: true,
                    layout: {
                        name: 'dagre'
                    },
                    style: [
                        {
                            selector: 'node',
                            style: {
                                'content': 'data(id)',
                                'text-opacity': 0.5,
                                'text-valign': 'center',
                                'text-halign': 'right',
                                'background-color': '#11479e'
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
                        }
                    ],
                    elements: {
                        nodes: nodes,
                        edges: edges
                    },
                });

            }
            function test1()  {
               // console.log(cyElem);
                var cy = $window.cy = cytoscape({
                    container: cyElem,
                    boxSelectionEnabled: true,
                    autounselectify: true,
                    layout: {
                        name: 'dagre'
                    },
                    style: [
                        {
                            selector: 'node',
                            style: {
                                'content': 'data(id)',
                                'text-opacity': 0.5,
                                'text-valign': 'center',
                                'text-halign': 'right',
                                'background-color': '#11479e'
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
                        }
                    ],
                    elements: {
                        nodes: [
                            { data: { id: 'PanicService' } },
                            { data: { id: 'n1' } },
                            { data: { id: 'n2' } },
                            { data: { id: 'n3' } },
                            { data: { id: 'n4' } },
                            { data: { id: 'n5' } },
                            { data: { id: 'n6' } },
                            { data: { id: 'n7' } },
                            { data: { id: 'n8' } },
                            { data: { id: 'n9' } },
                            { data: { id: 'n10' } },
                            { data: { id: 'n11' } },
                            { data: { id: 'n12' } },
                            { data: { id: 'n13' } },
                            { data: { id: 'n14' } },
                            { data: { id: 'n15' } },
                            { data: { id: 'n16' } }
                        ],
                        edges: [
                            { data: { source: 'PanicService', target: 'n1' } },
                            { data: { source: 'n1', target: 'n2' } },
                            { data: { source: 'n1', target: 'n3' } },
                            { data: { source: 'n4', target: 'n5' } },
                            { data: { source: 'n4', target: 'n6' } },
                            { data: { source: 'n6', target: 'n7' } },
                            { data: { source: 'n6', target: 'n8' } },
                            { data: { source: 'n8', target: 'n9' } },
                            { data: { source: 'n8', target: 'n10' } },
                            { data: { source: 'n11', target: 'n12' } },
                            { data: { source: 'n12', target: 'n13' } },
                            { data: { source: 'n13', target: 'n14' } },
                            { data: { source: 'n13', target: 'n15' } },
                        ]
                    },
                });

            }
            test();
        }
    };
});