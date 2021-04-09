

function Finder(){
  return {
    
    where: {},
    order: [],
    attributes: [],
    include: {},

    getInclude(model){
      return model ? this.include.find(i => i.model == model) : undefined
    }

  }
}

module.exports = {
  Finder
}
