//# XTriggerEvent

//javascript customed event for for browser and nodejs. With O dependency. Written by a novice!

//How to use it? Very easy to use. A basic use case:


    import XTriggerEvent from "./XTriggerEvent.js";


    class Caddy extends XTriggerEvent{

        addProduct(prod){

          prod = prod || {name:"milk xxl nonvo", price:"20", ref:"xxlmilk-00T-234"}
          this.registerEvent("addProduct", prod)
        }
        
        removeProduct(prod){
          prod = prod || {name:"milk xxl nonvo", price:"20", ref:"xxlmilk-00T-234"}
          this.registerEvent("removeProduct",prod)
        }
    }
      
      let mycaddy = new Caddy()
      
      function simp(arg){ console.log("\n1- Turn left to find similar products! If your are not interrested in '"+arg.name+"' .")}
      
      mycaddy.triggerOn("addProduct",(_)=>{ console.log("\n2- Add with success! '", _.name,"'")})
      mycaddy.triggerOn("addProduct", (_)=>{ console.log("\n3- Add two more units '"+ _.name +"' to get 60% discount on! Thanx!")})
      
      mycaddy.triggerOn("removeProduct",(_)=>{ console.log("\n4- Are sure , you don't need '"+ _.name +"' !.")})
      mycaddy.triggerOn("removeProduct",simp)
      
      mycaddy.addProduct();
      
      mycaddy.removeProduct();
      
//##end !
