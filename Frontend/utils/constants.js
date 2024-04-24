export const assessBatteryHealth = (temperature, voltage, humidity, chargeCycles) => {
    // Weight factors for different metrics
    const WEIGHT_TEMPERATURE = 0.4;
    const WEIGHT_VOLTAGE = 0.3;
    const WEIGHT_HUMIDITY = 0.2;
    const WEIGHT_CHARGE_CYCLES = 0.1;

    // Normalize values to a scale of 0 to 1
    const normalizedTemperature = temperature / 50; // Assuming max temperature of 50°C
    const normalizedVoltage = (voltage - 10) / 2; // Assuming normal voltage range of 10-12 volts
    const normalizedHumidity = humidity / 100; // Assuming humidity range of 0-100%
    const normalizedChargeCycles = chargeCycles / 500; // Assuming max charge cycles of 500

    // Calculate weighted average
    const weightedAverage = (
        WEIGHT_TEMPERATURE * normalizedTemperature +
        WEIGHT_VOLTAGE * normalizedVoltage +
        WEIGHT_HUMIDITY * normalizedHumidity +
        WEIGHT_CHARGE_CYCLES * normalizedChargeCycles
    );

    // Calculate health score (0 to 100)
    const healthScore = Math.max(0, Math.min(100, weightedAverage * 100));

    // Determine health status based on score
    let healthStatus;
    let color;
    let suggestions;
    let recommendations;

    if (healthScore >= 80) {
        healthStatus = "Good";
        color = "green";
        suggestions = "The battery is in good condition.";
        recommendations = {
            temperature: "Keep temperature below 50°C.",
            voltage: "Monitor voltage within the range of 10-12 volts.",
            humidity: "Maintain humidity levels between 0% and 100%.",
            chargeCycles: "Limit charge cycles to 500."
        };
    } else if (healthScore >= 60) {
        healthStatus = "Fair";
        color = "yellow";
        suggestions = "The battery health is fair. Monitor for changes.";
        recommendations = {
            temperature: "Keep temperature below 50°C.",
            voltage: "Monitor voltage within the range of 10-12 volts.",
            humidity: "Maintain humidity levels between 0% and 100%.",
            chargeCycles: "Limit charge cycles to 500."
        };
    } else {
        healthStatus = "Poor";
        color = "red";
        suggestions = "The battery health is poor. Consider maintenance or replacement.";
        recommendations = {
            temperature: "Reduce temperature immediately. High temperatures can damage the battery.",
            voltage: "Check for voltage irregularities and replace if necessary.",
            humidity: "Ensure humidity levels are within acceptable range to prevent corrosion.",
            chargeCycles: "Limit charge cycles to prevent further degradation. Consider replacing the battery."
        };
    }

    // Return health assessment object with recommendations
    return {
        healthStatus,
        healthScore,
        color,
        suggestions,
        recommendations
    };
}

// Example usage
const batteryTemperature = 45;    // Example temperature in degrees Celsius
const batteryVoltage = 11.8;      // Example voltage in volts
const batteryHumidity = 65;       // Example humidity in percentage
const batteryChargeCycles = 300;  // Example number of charge cycles

const batteryHealth = assessBatteryHealth(batteryTemperature, batteryVoltage, batteryHumidity, batteryChargeCycles);
console.log("Battery health assessment:", batteryHealth);
