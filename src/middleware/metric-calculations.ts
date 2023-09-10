//funciton imports
import { normalize } from "./helper-functions";


//Bus Factor Calculations
export function calculateBusFactor(data: string) { // assume this is going to be Github URL
    //object variables
    var crit_num_commits = 0; //set to value in object
    var total_num_commits = 0; //set to value in object
    var crit_pull_requests = 0; //set to value in object
    var total_pull_requests = 0; //set to value in object

    //variable weights
    var commit_weight = 0.5;
    var pull_request_weight = 0.5;

    //calculate bus factor score
    var crit_bus_factor = (crit_num_commits * commit_weight) + (crit_pull_requests * pull_request_weight);
    var crit_bus_factor_vals:number[] = [crit_num_commits, crit_pull_requests];
    crit_bus_factor = normalize(crit_bus_factor_vals, crit_bus_factor);

    var total_bus_factor = (total_num_commits * commit_weight) + (total_pull_requests * pull_request_weight);
    var total_bus_factor_vals:number[] = [total_num_commits, total_pull_requests];
    total_bus_factor = normalize(total_bus_factor_vals, total_bus_factor);
    
    var bus_factor_score = crit_bus_factor / total_bus_factor;

    return bus_factor_score;
}

//Correctness Calculations
 export function calculateCorrectness(data: string) { // this is going to be Github URL
    var closed_issues = 0; //set to value in object
    var open_issues = 0; //set to value in object

    var correctness_score = closed_issues / (closed_issues + open_issues);

    return correctness_score;
}

//Ramp-up Time Calculations
export function calculateRampUpTime(data: string) { // this is going to be Github URL
    var lines_readme = 0; //set to value in object
    var lines_code = 0; //set to value in object

    var ramp_up_time = lines_readme / lines_code;

    return ramp_up_time;
}

//Responsiveness Calculations
export function calculateResponsiveness(data: string) { // this is going to be Github URL
    var mothnly_commits = 0; //set to value in object
    var annual_commits = 0;  //set to value in object

    var responsiveness_score = mothnly_commits / annual_commits;

    return responsiveness_score;

}

//License Compliance Calculations
export function calculateLicenseCompliance(data: string) { // this is going to be Github URL
    var license = "license"; // set to value in object
    var valid_license = "temp"
    var license_compliance_score = 0;

    if (license == valid_license) {
        license_compliance_score = 1;
    }

    return license_compliance_score;
}

//NetScore Calculations
export function calculateNetScore(data: string) { // this is going to be Github URL
    //calculate scores
    var bus_factor = calculateBusFactor(data);
    var correctness = calculateCorrectness(data);
    var ramp_up_time = calculateRampUpTime(data);
    var responsiveness = calculateResponsiveness(data);
    var license_compliance = calculateLicenseCompliance(data);

    //Score weights
    var bus_factor_weight = 0.4;
    var correctness_weight = 0.15;
    var ramp_up_time_weight = 0.15;
    var responsiveness_weight = 0.3;

    var net_score = license_compliance * (bus_factor * bus_factor_weight + correctness * correctness_weight + ramp_up_time * ramp_up_time_weight + responsiveness * responsiveness_weight);

    return net_score;
}

