# XTriggerEvent
javascript customed event for for browser and nodejs. With O dependency.

How to use it:


class Caddy extends XTriggerEvent{

  addProduct(prod){
    prod=prod || {name:"milk xxl nonvo", price:"20", ref:"xxlmilk-00T-234"}
    this.registerEvent("addProduct", prod)
  }
  
  removeProduct(prod){
    prod=prod || {name:"milk xxl nonvo", price:"20", ref:"xxlmilk-00T-234"}
    this.registerEvent("removeProduct",prod)
  }
}

let mycaddy = new Caddy()

mycaddy.triggerEvent("addProduct",(_)=>{ console.log("Add with success!", _.name)})
mycaddy.triggerEvent("addProduct", ()=>{ console.log(" Add two more units "+ _name +" to get 60% discount on! Thanx!")}

mycaddy.triggerEvent("removeProd",(_)=>{"Are sure , you don't need "+ _name +" !."})

mycaddy.addProduct();

mycaddy.removeProduct();

##end !

