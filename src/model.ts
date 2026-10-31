export const VERSION='1.0.0';
export const fields = [
 ['cash','Induló pénzállomány','Ft',12000000,0,100000000000,100000],['backlog','Induló rendelésállomány','db',160,0,10000000,10],['orders','Havi új megrendelés','db/hó',280,0,10000000,10],['growth','Megrendelések havi növekedése','%',2,-100,30,.5],['price','Egységár','Ft/db',45000,0,1000000000,1000],['material','Anyagköltség','Ft/db',16000,0,1000000000,1000],['variable','Egyéb változó költség','Ft/db',3000,0,1000000000,500],['fixed','Fix működési költség','Ft/hó',1200000,0,10000000000,100000],['staff','Termelő munkatársak','fő',5,0,1000,1],['capacity','Egy fő kapacitása','db/fő/hó',55,0,100000,5],['wage','Teljes munkáltatói költség','Ft/fő/hó',650000,0,100000000,50000],['customerDelay','Vevői fizetési késedelem','hó',1,0,36,1],['supplierDelay','Szállítói fizetési késedelem','hó',1,0,36,1],['training','Betanulási idő','hó',4,0,36,1],['initialProductivity','Kezdeti termelékenység','%',35,0,100,5],['mentor','Betanítási teher új dolgozónként','régi fő',.3,0,5,.1],
] as const;
export type Params=Record<typeof fields[number][0],number>;
export const defaults=Object.fromEntries(fields.map(f=>[f[0],f[3]])) as Params;
export type Decision={sales:boolean;salesMonth:number;salesLift:number;salesOnce:number;salesMonthly:number;hire:boolean;hireMonth:number;hires:number;process:boolean;processMonth:number;investment:number;implementation:number;loss:number;gain:number};
export const decision:Decision={sales:false,salesMonth:3,salesLift:25,salesOnce:500000,salesMonthly:150000,hire:false,hireMonth:3,hires:2,process:false,processMonth:3,investment:3000000,implementation:3,loss:20,gain:25};
export type Scenario={id:string;name:string;color:string;p:Params;d:Decision;source:string};
export type Row={month:number;opening:number;orders:number;available:number;fulfilled:number;backlog:number;capacity:number;finance:number;utilization:number;revenue:number;profit:number;receipts:number;payments:number;cash:number;low:number;receivables:number;payables:number;unpaid:number;unpaidOperating:number;unpaidInvestment:number;investment:number;limits:string;financeProblem:boolean;productivity:number;stopped:boolean};
export const decisionFields=[['salesMonth',1,24],['salesLift',0,500],['salesOnce',0,1e10],['salesMonthly',0,1e10],['hireMonth',1,24],['hires',0,1000],['processMonth',1,24],['investment',0,1e10],['implementation',0,36],['loss',0,100],['gain',0,500]] as const;
export function validate(p:Params,d:Decision){
 for(const [key,,, ,min,max,step] of fields){const v=p[key];if(!Number.isFinite(v)||v<min||v>max||(step===1&&!Number.isInteger(v)))throw Error(`Érvénytelen paraméter: ${key}`);}
 for(const [key,min,max] of decisionFields){const v=d[key];if(!Number.isFinite(v)||v<min||v>max||(['salesMonth','hireMonth','hires','processMonth','implementation'].includes(key)&&!Number.isInteger(v)))throw Error(`Érvénytelen beavatkozás: ${key}`);}
 for(const k of ['sales','hire','process'] as const)if(typeof d[k]!=='boolean')throw Error('Érvénytelen kapcsoló');
}
export function simulate(p:Params,d:Decision,months=24):Row[]{
 validate(p,d); let cash=p.cash,backlog=p.backlog;const ar=new Map<number,number>(),ap=new Map<number,number>();const rows:Row[]=[];
 const add=(q:Map<number,number>,m:number,v:number)=>q.set(m,(q.get(m)||0)+v);const sum=(q:Map<number,number>)=>Array.from(q.values()).reduce((a,b)=>a+b,0);
 for(let m=1;m<=months;m++){
 const opening=cash,receipts=ar.get(m)||0;ar.delete(m);cash+=receipts;
 const age=m-d.hireMonth,hires=d.hire&&age>=0?d.hires:0;
 const productivity=p.training===0?1:Math.min(1,p.initialProductivity/100+(1-p.initialProductivity/100)*Math.max(0,age)/p.training);
 const training=hires>0&&age<p.training;
 const processAge=m-d.processMonth;
 const factor=!d.process||processAge<0?1:processAge<d.implementation?1-d.loss/100:1+d.gain/100;
 const capacity=Math.max(0,p.staff-(training?hires*p.mentor:0)+hires*productivity)*p.capacity*factor;
 const sales=d.sales&&m>=d.salesMonth;
 const overhead=p.fixed+(p.staff+hires)*p.wage+(sales?d.salesMonthly:0)+(sales&&m===d.salesMonth?d.salesOnce:0);
 const due=ap.get(m)||0;ap.delete(m);
 const investment=d.process&&m===d.processMonth?d.investment:0;
 const operatingDue=due+overhead,operatingPaid=Math.min(cash,operatingDue);cash-=operatingPaid;
 const investmentPaid=Math.min(cash,investment);cash-=investmentPaid;
 const unpaidOperating=operatingDue-operatingPaid,unpaidInvestment=investment-investmentPaid,unpaid=unpaidOperating+unpaidInvestment;
 const orders=p.orders*Math.pow(1+p.growth/100,m-1)*(sales?1+d.salesLift/100:1),available=backlog+orders;
 const unit=p.variable+(p.supplierDelay===0?p.material:0),finance=unit===0?Infinity:cash/unit;
 const stopped=unpaid>1e-7; const fulfilled=stopped?0:Math.max(0,Math.min(available,capacity,finance));
 const variablePaid=fulfilled*unit;cash=Math.max(0,cash-variablePaid);const low=Math.min(opening,cash);
 const revenue=fulfilled*p.price;
 let totalReceipts=receipts;
 if(p.customerDelay===0){cash+=revenue;totalReceipts+=revenue;}else add(ar,m+p.customerDelay,revenue);
 if(p.supplierDelay>0)add(ap,m+p.supplierDelay,fulfilled*p.material);
 backlog=available-fulfilled;
 const limits=stopped?'Fizetési hiány':[['Rendelés',available],['Kapacitás',capacity],['Finanszírozás',finance]].filter(([,n])=>Math.abs(Number(n)-fulfilled)<1e-6).map(([s])=>s).join(' + ');
 rows.push({month:m,opening,orders,available,fulfilled,backlog,capacity,finance,utilization:capacity?100*fulfilled/capacity:0,revenue,profit:revenue-fulfilled*(p.material+p.variable)-overhead,receipts:totalReceipts,payments:operatingPaid+investmentPaid+variablePaid,cash,low,receivables:sum(ar),payables:sum(ap)+unpaidOperating,unpaid,unpaidOperating,unpaidInvestment,investment:investmentPaid,limits,financeProblem:stopped||finance+1e-7<Math.min(available,capacity),productivity,stopped});
 if(stopped)break;
 }return rows;
}
export function summary(rows:Row[]){return {fulfilled:rows.reduce((s,r)=>s+r.fulfilled,0),profit:rows.reduce((s,r)=>s+r.profit,0),low:Math.min(...rows.map(r=>r.low)),backlog:rows.at(-1)!.backlog,first:rows.find(r=>r.financeProblem)?.month,stopped:rows.at(-1)!.stopped};}
export function exportCsv(scenarios:Scenario[]){const keys=Object.keys(simulate(scenarios[0].p,scenarios[0].d)[0]) as (keyof Row)[];const quote=(v:unknown)=>'"'+String(v).replaceAll('"','""')+'"';return '\ufeff'+[['modellverzió','forgatókönyv','adatforrás','paraméterek_JSON','beavatkozás_JSON',...keys].map(quote).join(';'),...scenarios.flatMap(s=>simulate(s.p,s.d).map(r=>[VERSION,s.name,s.source,JSON.stringify(s.p),JSON.stringify(s.d),...keys.map(k=>typeof r[k]==='number'?Number.isFinite(r[k] as number)?String(r[k]).replace('.',','):'korlátlan':r[k])].map(quote).join(';')))].join('\r\n');}
