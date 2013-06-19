define(['jquery', 'lacuna', 'template', 'text!templates/building/shipyard.tmpl'], 
function($, Lacuna, Template, TmplBuildingShipyard) {
    
    Template.loadStrings(TmplBuildingShipyard);

    function Shipyard() {
        var scope = this;

        scope.getTabs = function() {
            return [
                {
                    name: 'Build Queue',
                    content: Template.read.building_shipyard_build_queue_tab(),
                    select: scope.getQueueTab
                },
                {
                    name: 'Build Fleets',
                    content: Template.read.building_shipyard_build_ship_tab()
                }
            ];
        };
        scope.addEvents = function(vBuilding, url) {
        };

        scope.getQueueTab = function(tab) {
            var deferredViewBuildQueue = Lacuna.send({
                module  : url,
                method  : 'view_build_queue',
                params  : [{
                    session_id      : Lacuna.getSession(),
                    building_id     : scope.building.id,
                    no_paging       : 1
                }]
            });
            deferredViewBuildQueue.done(function(o) {
                var content = [];

                if (o.result.number_of_fleets_building > 0) {
                    // Add ships to queue and post to DOM.
                    _.each(o.result.ships_building, function(shipBuilding) {
                        content[content.length] = Template.read.building_shipyard_build_ship_item({
                            // TODO
                        });
                    });
                }
                else {
                    // No ships are currently building.
                    tab.add('<span class="center">No ships are currently building at this Shipyard.</span>');
                }
            });
        };
    }

    return new Shipyard();
});
