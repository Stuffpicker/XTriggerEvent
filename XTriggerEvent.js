export default class XTriggerEvent{
    /**
     * private global keeper
     */
    #O={removedCEvent:{}}
    
    /**
     * Add listener to custom event. 
     * Should be called before registration of the custom event. 
     * @param {String} ev_name 
     * @param {Function} cb 
     * @returns XTriggerEvent
     */
   on(ev_name,cb){
        cb = cb || function(){}
        typeof cb =='function'?
        '':
        (cb = function(){},
            console.error("\nThis.triggerOn(arg1,arg2): second arg2 should be a callback function!")) 
        if( !!this.#O[ev_name])
        {    console.log("__",this.#O[ev_name]["cb"])
            if(!!this.#O[ev_name]["cb"]?.includes(cb))
            {console.warn("\nIn this.triggerOn(arg1,arg2): the second arg2 callback already exists!") }
            else{this.#O[ev_name]["cb"].push(cb); console.log("__",this.#O[ev_name]["cb"])}
            
        }else{
            if(Object.keys(this.#O.removedCEvent).includes(ev_name)){

            }else{
                this.#O[ev_name]={cb:[cb]}; 
            }
                      
        }      
        return this;
    }
    
    triggerOn = this.on
    addEventListener = this.on
    /**
     * Register and dispatch custom event. 
     * You can use this.registerDispatchEvent(ev_name,argOpt). They are equals.
     * @param {String} ev_name 
     * @param {Any} argOpt 
     * @returns this
     */
    registerEvent(ev_name,argOpt){
        argOpt = argOpt || ''       
        
        if(!!this.#O[ev_name]){            
            //test and registerEvent my custom event
            this.#O[ev_name]["argOpt"]=argOpt
            this.#O[ev_name]["cb"]?this.#O[ev_name]["cb"]:this.#O[ev_name]["cb"]=[function(){}]
            //test and dispatch it             
            if(!!this.#O[ev_name]['cb']){
                if(this.#O[ev_name]['cb'].length>0){
                    let cbs=this.#O[ev_name]['cb']  ;      
                    cbs.forEach(cb => {
                        cb(this.#O[ev_name]["argOpt"]);
                    });
                }else{console.warn(new Error("\nNo callback available for this customed event '"+ev_name+"'."))}
            }else{console.warn(new Error("\nTest for dispatching fails for '"+ ev_name + "'. Check it!"))}
        }else{
             if(Object.keys(this.#O.removedCEvent).includes(ev_name)){
                console.warn("\nThis custom event '"+ ev_name + "' not available. May be already removed. Check it!")
            }else{
                this.#O[ev_name]["argOpt"]=argOpt
                this.#O[ev_name]["cb"] ? this.#O[ev_name]["cb"] : this.#O[ev_name]["cb"]=[function(){}]
                this.#O[ev_name]["cb"].length>0 ? (this.#O[ev_name]['cb'].forEach(cb => {
                        cb(this.#O[ev_name]["argOpt"]);
                    })) : ""
            }
        }
        console.table(this)
        return this;
    }

    /**
     * is the clone of this.registerEvent. They are the same!
     */
    registerDispatchEvent=this.registerEvent
 /**
  * use it with very strong care!
  * this.dispatchEvent(ev_name) should be called by chaining or separately!
  * @param {String} ev_name 
  * @param {Any} argOpt 
  * @returns this
  */
    registerEventSkipDispatch(ev_name,argOpt){
        argOpt = argOpt || ''       
        console.log(ev_name)  
        if(!!this.#O[ev_name]){
           
            this.#O[ev_name]["argOpt"]=argOpt
             this.#O[ev_name]["cb"]=function(){}

        }else{
            this.#O[ev_name]["argOpt"]=argOpt
            this.#O[ev_name]["cb"]=function(){}
        }
        
        return this;
    }

   /**
     * Dispatch this event_name. To be used with strng care!
     * @param {String} ev_name 
     * @returns this
     */
    dispatchEvent(ev_name){       
        if(!!this.#O[ev_name]){           
            //test and dispatch it 
            if(!!this.#O[ev_name]['cb']){
                if(this.#O[ev_name]['cb'].length>0){
                    let cbs=this.#O[ev_name]['cb']  ;      
                    cbs.forEach(cb => {
                        cb(this.#O[ev_name]["argOpt"]??"")
                    });
                }
            }else{console.warn("\nDispatch fails for this cust. event '" +ev_name +"'." )}
        }else{console.warn("\nThis cust. event " +ev_name +" no exists!")}        
        return this;
    }

    /**
     * Remove a callback linked from this custom event. It detaches a callback from a custom  event. 
     * Note the difference with unRegisterEvent(event_name).
     * unRegisterEvent(event_name) remove custome event Object including linked callback.
     * @param {String} ev_name 
     * @param {Function} cb 
     * @returns this
     */    
    unDispatchEvent(ev_name,cb){
        cb=cb||null
        ev_name = ev_name || null
        if(!!this.#O[ev_name]){
            if(typeof cb =='function'){
                this.#O[ev_name]['cb'] && this.#O[ev_name]['cb'].length>0?       
                this.#O[ev_name]['cb']=filter(cb_ => {cb_ !=cb }):
                ""
            }else{console.error("\nThis.unDispatchEvent(arg1,arg2): second arg2 should be a callback function!")}
        }else{console.error("\nThis"+ev_name+" no exist!")}        
        return this;
    }

    /**
     * Delete a registered custom event or Array of custom events.
     * @param {String|String[]} ev_name or [ev_name] 
     * @returns this
     */
    unRegisterEvent(ev_name){       
        if(typeof ev_name ==="string"){ev_name=[ev_name]}
        if(Array.isArray(ev_name)){
        ev_name.forEach(ev=>{
            let unr=Object.assign({},this.#O[ev]);
            delete this.#O[ev];
            console.info("\nEvent '"+ev+"' removed with success!");
            this.#O.removedCEvent[ev]=unr;
        })
         //!!this.#O[ev_name]? console.info("\nThis Event ",ev_name," do not exists!");
        }else{throw new Error("\n '",ev_name, "' only a String or Array as argument!")}
           console.log("--table: "); console.table(this.#O.removedCEvent[ev_name]);
           console.table(this.#O);   console.log(this.#O);
        return this;
    }

    /**
     * Restore a removed custom event or Array of custom events.
     * @param {String|String[]} ev_name or [ev_name] 
     * @returns this
     */
    restoreEvent(ev_name){
        console.table(this.#O.removedCEvent[ev_name])
        if(typeof ev_name ==="string"){ev_name=[ev_name]}
        if(Array.isArray(ev_name)){
        ev_name.forEach(ev=>{
            let unr = Object.assign({}, this.#O.removedCEvent[ev]);
            delete  this.#O.removedCEvent[ev];
            this.#O[ev]=unr;
            console.info("\nEvent '"+ev+"' restored with success!");
            
        })
         //!!this.#O[ev_name]? console.info("\nThis Event ",ev_name," do not exists!");
        }else{throw new Error("\n '",ev_name,"' only a String or Array as argument!")}
        return this;
    }
}
