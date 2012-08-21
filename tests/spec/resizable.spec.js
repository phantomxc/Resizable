//---------------------------------
// Makes a div element resizable
//---------------------------------

describe("Resizable", function() {
    var r
    var d
    beforeEach(function() {
        d = new Element('div', {'style':'width:100px; height:100px;', 'class':'container'});
        $('body').update(d);
        r = new Resizable(d);
        spyOn(r, 'setResizer').andCallThrough();
    });

    it("should initialize the resizable object", function() {
        expect(r.c).toEqual(d);
    });

    it("should have a set up default options", function() {
        expect(r.options).toBeDefined();
    });

    it("should set the position relative on the c", function() {
        expect($(r).c.getStyle('position')).toBe('relative');
    });

    it("should have a width of 100 and a height of 100. This isn't testing the class just the ", function() {
        var layout = $(r.c).getLayout();
        expect(layout.get('width')).toEqual(100);
        expect(layout.get('height')).toEqual(100);
    });


    it("setResizer insert a resizing element in the bottom right hand corner of the c, should account for padding as well", function() {
        expect(r.c.childElements()[0]).toEqual(r.resizer);
        console.log(r.resizer);
        expect(r.resizer.getStyle('left')).toEqual('140px');
        expect(r.resizer.getStyle('top')).toEqual('140px');
    });

    it("should overload the browser ondragstart event to be safe", function() {
        expect(r.resizer.ondragstart).toBeDefined();
    });

    describe("mouse moving with out being clicked should not call resizing", function() {

        beforeEach(function() {
            spyOn(r, 'resizing').andCallThrough();
            r.c.childElements()[0].simulate('mousemove');
        });

        it("should not call resizing", function() {
            expect(r.resizing).not.toHaveBeenCalled();
        });

        describe("resizer click", function() {

            beforeEach(function() {
                r.c.childElements()[0].simulate('mousedown', {'pointerX':'168', 'pointerY':'264'});
            });

            it("should set the mouse coordinates from where the mouse down started", function() {
                expect(r.start_x).toEqual(168);
                expect(r.start_y).toEqual(264);
            });

            describe("drag the mouse", function() {
                
                beforeEach(function() {
                    r.c.childElements()[0].simulate('mousemove', {'pointerX':'500', 'pointerY':'500'});
                });
                
                it("should call resizing", function() {
                    expect(r.resizing).toHaveBeenCalled();
                });

                it("should resize the c", function() {
                    expect(r.c.getStyle('width')).toEqual('432px');
                    expect(r.c.getStyle('height')).toEqual('336px');
                });

                it("should call setResizer", function() {
                    expect(r.setResizer).toHaveBeenCalled();
                });

            });

            describe("let go of mouse click", function() {

                beforeEach(function() {
                    r.resizing.reset();
                    r.c.childElements()[0].simulate('mouseup');
                    r.c.childElements()[0].simulate('mousemove');
                });
                
                it("should not call resizing once you let go of the mouse", function() {
                    expect(r.resizing).not.toHaveBeenCalled();
                });
            });
        });
    });
});

describe("Resizable with options", function() {
    var r 
    var d
    beforeEach(function() {
        d = new Element('div', {'style':'width:100px; height:100px;', 'class':'container'});
        $('body').update(d);
        r = new Resizable(d, {
            'onStart':function() {window['onstartfunc'] = 1;}, 
            'onEnd':function() {window['onendfunc'] =2 }
        });
        spyOn(r, 'onStart').andCallThrough();
        spyOn(r, 'onEnd').andCallThrough();
    });

    describe("resizer start", function() {
        beforeEach(function() {
            r.c.childElements()[0].simulate('mousedown', {'pointerX':'168', 'pointerY':'264'});
        });

        it("should call onStart", function() {
            expect(r.onStart).toHaveBeenCalled();
            expect(window["onstartfunc"]).toEqual(1);
        });

        describe("resizer end", function() {
            beforeEach(function() {
                r.c.childElements()[0].simulate('mouseup');
            });

            it("should call onEnd", function() {
                expect(r.onEnd).toHaveBeenCalled();
                expect(window["onendfunc"]).toEqual(2);
            });
        });

    });
});
