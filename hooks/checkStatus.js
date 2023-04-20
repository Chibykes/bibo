export default function checkStatus(from, to){

    let start = new Date(from).getTime();
    let end = new Date(to).getTime() + (1000 * 60 * 60 * 24);
    let current = new Date().getTime()

    console.log({ start, end, current })

    if(start > current){
        return "not started"
    }

    if(end < current){
        return "ended"
    }

    if( (start <= current)  && (end > current) ){
        return "active"
    }
}