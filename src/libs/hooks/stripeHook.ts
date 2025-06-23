import {} from "../services/userServices";
import { useMutation, useQueryClient ,useQuery} from '@tanstack/react-query';
import { createUserSubscription,upgradeUserSubscription,downgradeUserSubscription } from "../services/stripeServices";

    // export  function useCreateNewCustomer(){
    //   return useMutation({
    //     mutationFn:createNewCustomer
    //   });
    
    // };


    export  function useCreateUserSubscribtion(){
        return useMutation ({
            mutationFn:createUserSubscription
        })
    }
    export  function useUpgradeUserSubscribtion(){
        return useMutation ({
            mutationFn:upgradeUserSubscription
        })
    }
    export  function useDowngradeUserSubscribtion(){
        return useMutation ({
            mutationFn:downgradeUserSubscription
        })
    }