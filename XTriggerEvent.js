export default class XTriggerEvent{
    /**
     * private global keeper
     */
    #O={}

    /**
     * Add listener to custom event. 
     * Should be called before registration of the custom event. 
     * @param {String} ev_name 
     * @param {Function} cb 
     * @returns this
     */
   triggerOn(ev_name,cb){
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
            this.#O[ev_name]={cb:[cb]};           
        }      
        return this;
    }

    registerEvent(ev_name,argOpt){
        argOpt = argOpt || ''       
        console.log(ev_name)  
        if(!!this.#O[ev_name]){
            //test and registerEvent my custom event
            this.#O[ev_name]["argOpt"]=argOpt
            //test and dispatch it 
            if(!!this.#O[ev_name]['cb']){
                if(this.#O[ev_name]['cb'].length>0){
                    let cbs=this.#O[ev_name]['cb']  ;      
                    cbs.forEach(cb => {
                        cb(this.#O[ev_name]["argOpt"]);
                    });
                }else{console.warn("\nNo callback available for this customed event '",ev_name,"'.")}
            }else{console.warn("\nTest for dispatching fails for '"+ ev_name + "'. Check it!")}
        }else{console.warn("\n '"+ ev_name + "' not available. May be already remove. Check it!")}
        
        return this;
    }
    /**
     * Dispatch this event_name 
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
            }else{}
        }else{console.warn("\nThis cust. event " +ev_name +" no exists!")}        
        return this;
    }

    /**
     * Remove the callback linked to this custom event
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
     * 
     * @param {String} ev_name 
     * @returns this
     */
    unRegisterEvent(ev_name){
        !!this.#O[ev_name]?
        (delete this.#O[ev_name],console.info("\nEvent ",ev_name, " removed with success!")):
        console.info("\nThis Event ",ev_name," do not exists!");
        return this;
    }
}
