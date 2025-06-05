let data = {
	code:200,
    msg:{
        data:[
        {
            smiles:"",
            Compound_name:"A",
            Abbreviation:"NC",
            Chemical_formula:"(C6H7N3O11)n"
        }
        ]
    }
}
let rnx_data = {
	code:200,
    msg:{
        data:[
            {
                smiles:[""],  //可能是多个
                Raw_materials:["B"],
                Reagent:["W","X"],
                Reaction_temperature:"28-34℃",
                Reaction_time:"1h",
                Yield:"",
                description_cn:{
                    Reaction_steps:"1. Add 5ml 65% nitric acid and 15ml 98% sulfuric acid to 100ml beaker. Cool and add a wad of medical absorbent cotton about half the size of an egg (to fluff up and make sure nitrification is complete). Cover the dish and leave for half an hour.",
                    Reaction_type:"esterification reaction",
                    Available_Experimental_Data:"1H-NMR、13C-NMR、IR、Nitrification rate"
                },
                description_en:{
                    Reaction_steps:"1. Add 5ml 65% nitric acid and 15ml 98% sulfuric acid to 100ml beaker. Cool and add a wad of medical absorbent cotton about half the size of an egg (to fluff up and make sure nitrification is complete). Cover the dish and leave for half an hour.",
                    Reaction_type:"esterification reaction",
                    Available_Experimental_Data:"1H-NMR、13C-NMR、IR、Nitrification rate"
                },
            }
        ]
    }
}
