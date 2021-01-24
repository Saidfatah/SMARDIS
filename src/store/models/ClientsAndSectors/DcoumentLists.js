import {clientModel,sectorModel} from './DocumentModels'

export const clientsList = []
export const sectorsList = []

const shikh = sectorModel(sectorsList.length +1 ,'الزاوية','tinghir')
sectorsList.push(shikh)
const tajda = sectorModel(sectorsList.length +1 ,'تجدة','ouarzazate')
sectorsList.push(tajda)
const tkhisa = sectorModel(sectorsList.length +1 ,'تخيسة','ouarzazate')
sectorsList.push(tkhisa)
const qastor = sectorModel(sectorsList.length +1 ,'كاستور','ouarzazate')
sectorsList.push(qastor)
const taourirt = sectorModel(sectorsList.length +1 ,'تاوريرة','ouarzazate')
sectorsList.push(taourirt)

const Ali = clientModel(clientsList.length +1 ,'النجمي',1,'AB1','0654785421','زاوية الشيخ سيدي عتمان','Ouarzazate',500.50,3000.00)
clientsList.push(Ali)
const Moaud1 = clientModel(clientsList.length +1 ,'Moaud1',1,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Moaud1)
const smail = clientModel(clientsList.length +1 ,'smail',1,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(smail)
const Mohamed = clientModel(clientsList.length +1 ,'mohamed',1,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Mohamed)

const Souad = clientModel(clientsList.length +1 ,'souad',2,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Souad)
const Mounir = clientModel(clientsList.length +1 ,'mounir',2,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Mounir)
const Etmani = clientModel(clientsList.length +1 ,'etmani',2,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Etmani)

const Mouad = clientModel(clientsList.length +1 ,'mouad',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Mouad)
const Faycal = clientModel(clientsList.length +1 ,'faycal',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Faycal)
const Ghafour = clientModel(clientsList.length +1 ,'ghafour',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(Ghafour)

const felix = clientModel(clientsList.length +1 ,'felix',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(felix)
const stephan = clientModel(clientsList.length +1 ,'stephan',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(stephan)
const malik = clientModel(clientsList.length +1 ,'malik',3,'AB1','0654785421','Hmam ahbass','Ouarzazate',500.50,3000.00)
clientsList.push(malik)