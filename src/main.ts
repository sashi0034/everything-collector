import { logger } from "./logger";
import { processBotRoutine } from "./processBotRoutine";



function main(){
    logger.level = "all"
    
    process.on('uncaughtException', function(err) {
        logger.error(err)
    });

    processBotRoutine()
}


main();
