Resizable = Class.create();

    Resizable.prototype = {
    
        initialize: function(elm) {
            
            var defaults = {
                onStart: null,
                onEnd: null
            }

            this.options = Object.extend(defaults, arguments[1] || { });

            if (this.options.onStart) {
                this.onStart = this.options.onStart;
            }

            if (this.options.onEnd) {
                this.onEnd = this.options.onEnd;
            }

            //CONTAINER
            this.c = elm;
            this.c.setStyle({'position':'relative'});
            this.resizer = new Element('div', {'class':'resizer'});
            // HIDE and place the resizer to get its dimensions
            this.resizer.toggle();
            this.c.insert(this.resizer);
            
            this.setResizer();
            
            this.resizer.observe('mousedown', function(ev) {
                if (this.onStart) {
                    this.onStart();
                }
                
                this.c.observe('resizer:mousemove', function(ev) {
                    this.resizing(ev.memo);
                }.bind(this));

                this.c.observe('resizer:mouseup', function(ev) {
                    this.c.stopObserving('resizer:mousemove');
                    this.c.stopObserving('resizer:mouseup');
                }.bind(this));
                
                var p = Event.pointer(ev)
                this.start_x = p.x;
                this.start_y = p.y;

                document.observe('mousemove', function(ev) {
                    this.c.fire('resizer:mousemove', ev);
                }.bind(this));
                
                document.observe('mouseup', function(ev) {
                    if (this.onEnd) {
                        this.onEnd();
                    }
                    this.c.fire('resizer:mouseup', ev);
                }.bind(this));
            }.bind(this));

            this.resizer.ondragstart = function() { return false; }
            this.resizer.toggle();
        },

        setResizer: function() {
           
            var r_layout = this.resizer.getLayout();
            console.log('resizer layout');
            console.log(r_layout);
            var c_layout = this.c.getLayout();
            console.log(c_layout.get('padding-box-width'));
            console.log(r_layout.get('padding-box-width'));

            Element.setStyle(this.resizer,{
                'position':'absolute',
                'left':c_layout.get('padding-box-width') - r_layout.get('padding-box-width') + 'px',
                'top':c_layout.get('padding-box-height') - r_layout.get('padding-box-width') + 'px'
            });
        },

        resizing: function(ev) {
            var p = Event.pointer(ev);
            var xdiff = p.x - this.start_x;
            var ydiff = p.y - this.start_y;
            
            var c_layout = this.c.getLayout();
            
            this.c.setStyle({'width': c_layout.get('width') + xdiff + 'px'});
            this.c.setStyle({'height': c_layout.get('height') + ydiff + 'px' }); 

            this.start_x = p.x;
            this.start_y = p.y;
            
            this.setResizer();
        }

    }
