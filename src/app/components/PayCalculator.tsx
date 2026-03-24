import { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, TrendingUp, Users, Languages } from 'lucide-react';

// Translations
const TRANSLATIONS = {
  en: {
    languageToggle: 'Español',
    driverStatus: {
      title: 'Driver Status',
      casual: { label: '85% Classification rate of pay', description: '' },
      yearOne: { label: '92.5% Classification rate of pay', description: '' },
      union: { label: '100% Classification rate of pay', description: '' },
      yourPayRate: 'Your pay rate',
      ofUnionRate: 'of union rate'
    },
    payRates: {
      title: 'Your Pay Rates',
      perMile: 'Per Mile',
      metroMin: 'Metro/Min',
      perStopHour: 'Per Stop/Hour',
      standard: 'Standard',
      base: 'Base'
    },
    tripDetails: {
      title: 'Trip Details',
      totalMiles: 'Total Miles',
      enterMiles: 'Enter miles',
      metroMinutes: 'Metro Minutes',
      enterMetroMinutes: 'Enter metro minutes',
      metroDescription: 'Used for city mileage. Rate = $0.5375/min at 100%',
      loadType: 'Load Type',
      selectLoadType: 'Select load type',
      perishable: 'Perishable',
      grocery: 'Grocery',
      numberOfStops: 'Number of Stops',
      enterNumberOfStops: 'Enter number of stops',
      stop: 'stop',
      stops: 'stops',
      hour: 'hour',
      hours: 'hours',
      min: 'min'
    },
    goingHome: {
      title: 'Going Home After This Load',
      description: 'Adds +1 standard ({amount}) to base pay. Uncheck if you have multiple loads.'
    },
    putAway: {
      title: 'Put Away',
      description: 'Each standard is {amount}. Enter number of put aways.',
      numberOfPutAways: 'Put Aways:'
    },
    salvage: {
      title: 'Picked Up Salvage',
      description: 'At an unscheduled store, and if scheduled you must load yourself.',
      doubleRate: 'Normally at last stop. Double rate if at 1st or 2nd stop.',
      pickedUpAt: 'Salvage picked up at 1st or 2nd stop (not last)',
      pickedUpAtFirst: 'Salvage not at final destination',
      pickedUpAtLast: 'Salvage at last stop (normal rate)',
      doubleRateAmount: 'Double rate: 2 standards = ',
      lastStopNormal: 'Last stop (normal): 1 standard = ',
      oneStandard: '1 standard = ',
      twoStandards: '2 standards = '
    },
    perishableDropHook: {
      singleStop: 'Stop is Drop & Hook (rare)',
      lastStop: 'Last stop is Drop & Hook (rare)',
      pays: 'Pays 2 standards (30 min) = '
    },
    groceryDropHook: {
      singleStop: 'Stop is Drop & Hook',
      lastStop: 'Last stop is Drop & Hook',
      numberOfStandards: 'Number of Standards:',
      standard: 'standard',
      standards: 'standards',
      doubleDropHook: '(double drop & hook)'
    },
    groceryAdditional: {
      title: 'Additional Standards:',
      firstStopOver6: 'First stop has more than 6 skids (+1 standard)',
      breadStacks: 'Stop with bread',
      breadStacksPlural: 'Stops with bread',
      hasAdditionalStandards: 'Stops with bread',
      totalAdditional: 'Total additional standards:'
    },
    standardsPay: {
      title: 'Additional delays',
      yourRate: 'Your rate',
      autoStandards: 'Automatic Standards',
      dispatch: 'Dispatch',
      pick: 'Pick',
      drop: 'Drop',
      putAway: 'Put Away',
      goingHome: 'Going Home',
      salvage: 'Salvage',
      add: 'Add',
      selectOption: 'Select item',
      minutes: 'Minutes:',
      itemsList: 'Added items',
      noItems: 'No additional items added yet'
    },
    standardOptions: {
      loadNotReady: 'Load not ready on time',
      trailerReload: 'Trailer reload',
      truckRepair: 'Truck repair (Garage)',
      redLight: 'Red light at door',
      waitingBackDoor: 'Waiting at back door',
      walkAroundStore: 'Walk around store',
      walkBackTruck: 'Walk back to truck',
      truckInFront: 'Truck in front of me',
      overDelivery: 'Store over delivery',
      changeOfTruck: 'Change of truck',
      brokenTruck: 'Broken down truck',
      reeferRunningHot: 'Reefer running hot',
      other: 'Other'
    },
    breakdown: {
      title: 'Pay Breakdown',
      miles: 'Miles',
      metroMinutes: 'Metro Minutes',
      stopPay: 'Stop Pay',
      additionalStandards: 'Additional Standards',
      baseStandards: 'Base Standards',
      salvage: 'Salvage',
      additionalItems: 'Additional Items',
      expectedTotal: 'Expected Pay'
    }
  },
  es: {
    languageToggle: 'English',
    driverStatus: {
      title: 'Estado del Conductor',
      casual: { label: '85% Clasificación de tarifa de pago', description: '' },
      yearOne: { label: '92.5% Clasificación de tarifa de pago', description: '' },
      union: { label: '100% Clasificación de tarifa de pago', description: '' },
      yourPayRate: 'Tu tasa de pago',
      ofUnionRate: 'de la tarifa sindical'
    },
    payRates: {
      title: 'Tus Tarifas de Pago',
      perMile: 'Por Milla',
      metroMin: 'Metro/Min',
      perStopHour: 'Por Parada/Hora',
      standard: 'Estándar',
      base: 'Base'
    },
    tripDetails: {
      title: 'Detalles del Viaje',
      totalMiles: 'Millas Totales',
      enterMiles: 'Ingrese millas',
      metroMinutes: 'Minutos Metro',
      enterMetroMinutes: 'Ingrese minutos metro',
      metroDescription: 'Usado para millaje urbano. Tarifa = $0.5375/min al 100%',
      loadType: 'Tipo de Carga',
      selectLoadType: 'Seleccione tipo de carga',
      perishable: 'Refrigerado',
      grocery: 'Caja seca',
      numberOfStops: 'Número de Paradas',
      enterNumberOfStops: 'Ingrese número de paradas',
      stop: 'parada',
      stops: 'paradas',
      hour: 'hora',
      hours: 'horas',
      min: 'min'
    },
    goingHome: {
      title: 'Regresando a Casa Después de Esta Carga',
      description: 'Agrega +1 estándar ({amount}) al pago base. Desmarque si tiene múltiples cargas.'
    },
    putAway: {
      title: 'Puestas en el Cooler',
      description: 'Cada estándar es {amount}. Ingrese número de veces.',
      numberOfPutAways: 'Puestas en el Cooler:'
    },
    salvage: {
      title: 'Recogió Reciclaje',
      description: 'En una tienda no programada, y si está programada debe cargarlo tú mismo.',
      doubleRate: 'Normalmente en la última parada. Tarifa doble si es en la 1ra o 2da parada.',
      pickedUpAt: 'Reciclaje recogido en 1ra o 2da parada (no la última)',
      pickedUpAtFirst: 'Reciclaje no en destino final',
      pickedUpAtLast: 'Reciclaje en última parada (tarifa normal)',
      doubleRateAmount: 'Tarifa doble: 2 estándares = ',
      lastStopNormal: 'Última parada (normal): 1 estándar = ',
      oneStandard: '1 estándar = ',
      twoStandards: '2 estándares = '
    },
    perishableDropHook: {
      singleStop: 'Parada es Soltar y enganchar (raro)',
      lastStop: 'Última parada es Soltar y enganchar (raro)',
      pays: 'Paga 2 estándares (30 min) = '
    },
    groceryDropHook: {
      singleStop: 'Parada es Soltar y enganchar',
      lastStop: 'Última parada es Soltar y enganchar',
      numberOfStandards: 'Número de Estándares:',
      standard: 'estándar',
      standards: 'estándares',
      doubleDropHook: '(doble drop & hook)'
    },
    groceryAdditional: {
      title: 'Estándares Adicionales:',
      firstStopOver6: 'Primera parada tiene más de 6 paletas (+1 estándar)',
      breadStacks: 'Parada con pan',
      breadStacksPlural: 'Paradas con pan',
      hasAdditionalStandards: 'Paradas con pan',
      totalAdditional: 'Total de estándares adicionales:'
    },
    standardsPay: {
      title: 'Retrasos adicionales',
      yourRate: 'Tu tarifa',
      autoStandards: 'Estándares Automáticos',
      dispatch: 'Despacho',
      pick: 'Recoger',
      drop: 'Soltar',
      putAway: 'Puestas en el Cooler',
      goingHome: 'Regresando a Casa',
      salvage: 'Reciclaje',
      add: 'Agregar',
      selectOption: 'Seleccione artículo',
      minutes: 'Minutos:',
      itemsList: 'Artículos agregados',
      noItems: 'No se han agregado artículos adicionales aún'
    },
    standardOptions: {
      loadNotReady: 'Carga no lista a tiempo',
      trailerReload: 'Recarga de trailer',
      truckRepair: 'Reparación de camión (Garaje)',
      redLight: 'Luz roja en la puerta',
      waitingBackDoor: 'Esperando en la puerta trasera',
      walkAroundStore: 'Caminar alrededor de la tienda',
      walkBackTruck: 'Caminar de regreso al camión',
      truckInFront: 'Camión enfrente de mí',
      overDelivery: 'Sobre entrega de tienda',
      changeOfTruck: 'Cambio de camión',
      brokenTruck: 'Camión averiado',
      reeferRunningHot: 'Refrigerado caliente',
      other: 'Otro'
    },
    breakdown: {
      title: 'Desglose de Pago',
      miles: 'Millas',
      metroMinutes: 'Minutos Metro',
      stopPay: 'Pago por Parada',
      additionalStandards: 'Estándares Adicionales',
      baseStandards: 'Estándares Base',
      salvage: 'Reciclaje',
      additionalItems: 'Artículos Adicionales',
      expectedTotal: 'Pago Esperado'
    }
  }
};

// Driver status types for union shop
const DRIVER_STATUS = {
  casual: { percentage: 0.85 },
  secondYear: { percentage: 0.925 },
  union: { percentage: 1.0 },
};

// Year-based pay rates (100% union rate)
const YEAR_RATES = {
  2026: {
    hourly: 32.25,
    metroMinute: 0.5375,
    standard: 8.0625,
    mileage: 0.67,
  },
  2027: {
    hourly: 33,
    metroMinute: 0.55,
    standard: 8.25,
    mileage: 0.68,
  },
  2028: {
    hourly: 33.75,
    metroMinute: 0.5625,
    standard: 8.4375,
    mileage: 0.69,
  },
  2029: {
    hourly: 34.50,
    metroMinute: 0.575,
    standard: 8.625,
    mileage: 0.70,
  },
  2030: {
    hourly: 35.25,
    metroMinute: 0.5875,
    standard: 8.8125,
    mileage: 0.71,
  },
};

// Common standard pay items that drivers can select
// Function to get standard pay options based on the standard rate for the year
const getStandardPayOptions = (standardRate: number) => [
  { id: 'load_not_ready', translationKey: 'loadNotReady', defaultAmount: standardRate },
  { id: 'trailer_reload', translationKey: 'trailerReload', defaultAmount: standardRate },
  { id: 'truck_repair', translationKey: 'truckRepair', defaultAmount: standardRate },
  { id: 'red_light', translationKey: 'redLight', defaultAmount: standardRate },
  { id: 'waiting_back_door', translationKey: 'waitingBackDoor', defaultAmount: standardRate },
  { id: 'walk_around_store', translationKey: 'walkAroundStore', defaultAmount: standardRate },
  { id: 'walk_back_truck', translationKey: 'walkBackTruck', defaultAmount: standardRate },
  { id: 'truck_in_front', translationKey: 'truckInFront', defaultAmount: standardRate },
  { id: 'over_delivery', translationKey: 'overDelivery', defaultAmount: standardRate },
  { id: 'change_of_truck', translationKey: 'changeOfTruck', defaultAmount: standardRate },
  { id: 'broken_truck', translationKey: 'brokenTruck', defaultAmount: standardRate },
  { id: 'reefer_running_hot', translationKey: 'reeferRunningHot', defaultAmount: standardRate },
  { id: 'other', translationKey: 'other', defaultAmount: 0 },
];

// Helper function to get translation key from type/id
const getTranslationKeyFromType = (type: string): string => {
  const options = getStandardPayOptions(0); // Rate doesn't matter for mapping
  const option = options.find(opt => opt.id === type);
  return option?.translationKey || 'other';
};

interface StandardItem {
  id: string;
  type: string;
  label: string;
  amount: number;
  baseAmount: number; // Store the base amount before multiplier
  isFixed: boolean; // True for fuel advance and other custom amounts
  standardsCount?: number; // Store the number of standards (for minute-based items)
}

type DriverStatusType = keyof typeof DRIVER_STATUS;

// Helper function to format currency intelligently
const formatCurrency = (value: number): string => {
  const fixed4 = value.toFixed(4);
  // Check if last two decimals are zeros
  if (fixed4.endsWith('00')) {
    return value.toFixed(2);
  }
  return fixed4;
};

export function PayCalculator() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [driverStatus, setDriverStatus] = useState<DriverStatusType>('union');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  
  const t = TRANSLATIONS[language];
  
  // Get rates for selected year
  const yearRates = YEAR_RATES[selectedYear as keyof typeof YEAR_RATES];
  const STANDARD_RATE = yearRates.standard;
  const BASE_PAY_RATES = {
    perMile: yearRates.mileage,
    perStop: yearRates.hourly,
    perDetentionHour: yearRates.hourly,
  };
  
  const [miles, setMiles] = useState<string>('');
  const [metroMinutes, setMetroMinutes] = useState<string>('');
  const [loadType, setLoadType] = useState<'perishable' | 'grocery' | ''>('');
  const [numberOfStops, setNumberOfStops] = useState<string>('');
  const [perishableLastStopIsDropHook, setPerishableLastStopIsDropHook] = useState<boolean>(false);
  const [perishableLastStopStandards, setPerishableLastStopStandards] = useState<string>('2');
  const [groceryLastStopIsDropHook, setGroceryLastStopIsDropHook] = useState<boolean>(false);
  const [groceryLastStopStandards, setGroceryLastStopStandards] = useState<string>('2');
  const [groceryFirstStopOver6Skids, setGroceryFirstStopOver6Skids] = useState<boolean>(false);
  const [groceryHasBreadStacks, setGroceryHasBreadStacks] = useState<string>('0');
  const [groceryHasAdditionalStandards, setGroceryHasAdditionalStandards] = useState<boolean>(false);
  const [perishableHasBreadStacks, setPerishableHasBreadStacks] = useState<boolean>(false);
  const [putAway, setPutAway] = useState<string>('0');
  const [goingHome, setGoingHome] = useState<boolean>(false);
  const [salvageAtFirstOrSecondStop, setSalvageAtFirstOrSecondStop] = useState<boolean>(false);
  const [salvageAtLastStop, setSalvageAtLastStop] = useState<boolean>(false);
  const [standardItems, setStandardItems] = useState<StandardItem[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<string>('');
  const [standardMinutes, setStandardMinutes] = useState<string>('');

  // Get the percentage multiplier based on driver status
  const payMultiplier = DRIVER_STATUS[driverStatus].percentage;

  // Calculate standards based on minutes (detention tier system)
  const calculateStandardsFromMinutes = (minutes: number): number => {
    if (minutes < 8) return 0;
    return Math.floor((minutes - 8) / 15) + 1;
  };

  // Update standard items when driver status or year changes
  useEffect(() => {
    setStandardItems(prevItems => 
      prevItems.map(item => ({
        ...item,
        amount: item.isFixed ? item.baseAmount : item.baseAmount * payMultiplier
      }))
    );
  }, [payMultiplier]);
  
  // Automatically clear "6+ skids" when "Drop & Hook" is unchecked
  useEffect(() => {
    if (!groceryLastStopIsDropHook) {
      setGroceryFirstStopOver6Skids(false);
    }
  }, [groceryLastStopIsDropHook]);

  // Update standard items when year changes to reflect new standard rates
  useEffect(() => {
    setStandardItems(prevItems => 
      prevItems.map(item => {
        // If it's not a fixed item and not 'other', update the base amount to the new year's standard rate
        if (!item.isFixed && item.type !== 'other') {
          const count = item.standardsCount || 1; // Use stored count or default to 1
          return {
            ...item,
            baseAmount: STANDARD_RATE * count,
            amount: STANDARD_RATE * count * payMultiplier
          };
        }
        return item;
      })
    );
  }, [selectedYear, STANDARD_RATE, payMultiplier]);

  // Calculate stop time in hours based on load type and number of stops
  const calculateStopHours = (): number => {
    const stops = parseInt(numberOfStops || '0');
    if (stops === 0) return 0;

    if (loadType === 'perishable') {
      if (stops === 1) {
        // Single stop: 90 min normally, OR 2 standards if Drop & Hook (rare)
        if (perishableLastStopIsDropHook) {
          return 2 * 0.25; // 2 standards = 30 min (Each standard = 1/4 hour = 15 min)
        }
        return 1.5; // 90 minutes
      }
      if (stops === 2) {
        // Two stops: Exception - first stop is always 90 min regardless of drop & hook
        let firstStopTime = 1.5; // Always 90 min for 2-stop loads
        let lastStopTime = 0.5; // 30 minutes normally
        if (perishableLastStopIsDropHook) {
          lastStopTime = 2 * 0.25; // 2 standards = 30 min
        }
        return firstStopTime + lastStopTime;
      }
      // 3+ stops: 
      if (stops === 3) {
        // 3 stops with drop & hook: first 2 stops are 1 hour each, last stop is 2 standards (30 min)
        // 3 stops without drop & hook: all stops are 45 min each
        if (perishableLastStopIsDropHook) {
          const firstTwoStops = 2 * 1.0; // First 2 stops are 1 hour each
          const lastStopTime = 2 * 0.25; // 2 standards = 30 min
          return firstTwoStops + lastStopTime;
        } else {
          return stops * 0.75; // All stops are 45 min each
        }
      }
      
      // 4+ stops:
      // With drop & hook: first 3 stops are 45 min, any middle stops are 45 min, last stop is 2 standards (30 min)
      // Without drop & hook: all stops are 45 min each
      if (perishableLastStopIsDropHook) {
        const allStopsExceptLast = (stops - 1) * 0.75; // All stops except last are 45 min each
        const lastStopTime = 2 * 0.25; // 2 standards = 30 min
        return allStopsExceptLast + lastStopTime;
      } else {
        return stops * 0.75; // All stops are 45 min each
      }
    } else {
      // Grocery loads
      if (stops === 1) {
        // Single stop: 60 min normally, OR X standards if Drop & Hook
        if (groceryLastStopIsDropHook) {
          const numStandards = parseInt(groceryLastStopStandards || '2');
          return numStandards * 0.25; // Each standard = 1/4 hour = 15 min
        }
        return 1.0; // 60 minutes
      }
      
      if (stops >= 2) {
        // All stops are 30 min EXCEPT:
        // - If NOT drop/hook: last stop is 60 min
        // - If drop/hook (2 stops): 1st=30min, 2nd=standards only
        // - If drop/hook (3+ stops): second-to-last is 60 min, last stop is standards
        let totalTime = 0;
        
        if (groceryLastStopIsDropHook) {
          const numStandards = parseInt(groceryLastStopStandards || '2');
          if (stops === 2) {
            // 2 stops with drop/hook: 1st=30min, 2nd=standards (no extra 60 min)
            totalTime = 0.5 + numStandards * 0.25;
          } else {
            // 3+ stops with drop/hook: all 30min except second-to-last is 60 min, last is standards
            totalTime = (stops - 2) * 0.5 + 1.0 + numStandards * 0.25;
          }
        } else {
          // No drop/hook: all stops 30 min except last is 60 min
          totalTime = (stops - 1) * 0.5 + 1.0;
        }
        
        return totalTime;
      }
      
      return 0;
    }
  };

  const stopHours = calculateStopHours();

  // Calculate additional grocery standards for 1+ stop loads
  const groceryAdditionalStandards = (): number => {
    if (loadType !== 'grocery' || parseInt(numberOfStops || '0') < 1) return 0;
    
    let additionalStandards = 0;
    // 6+ skids only applies to exactly 2 stop loads
    if (groceryFirstStopOver6Skids && parseInt(numberOfStops || '0') === 2) additionalStandards += 1;
    // Bread stacks applies to 1+ stop loads - now can be multiple
    additionalStandards += parseInt(groceryHasBreadStacks || '0');
    
    return additionalStandards;
  };

  // Calculate additional perishable standards for 1+ stop loads
  const perishableAdditionalStandards = (): number => {
    if (loadType !== 'perishable' || parseInt(numberOfStops || '0') < 1) return 0;
    
    let additionalStandards = 0;
    // Only bread stacks apply to perishable loads (not 6+ skids)
    if (perishableHasBreadStacks) additionalStandards += 1;
    
    return additionalStandards;
  };

  const groceryAdditionalStandardsCount = groceryAdditionalStandards();
  const perishableAdditionalStandardsCount = perishableAdditionalStandards();
  const additionalStandardsCount = groceryAdditionalStandardsCount + perishableAdditionalStandardsCount;
  const additionalStandardsPay = additionalStandardsCount * STANDARD_RATE * payMultiplier;

  // Automatic base standards for every load (Dispatch, Pick, Drop) + Going Home + Put Away
  const BASE_STANDARDS_COUNT = 3; // Dispatch, Pick, Drop (always paid)
  let additionalBaseStandards = 0;
  const putAwayCount = parseInt(putAway || '0');
  if (putAwayCount > 0) additionalBaseStandards += putAwayCount;
  if (goingHome) additionalBaseStandards += 1;
  const baseStandardsCount = BASE_STANDARDS_COUNT + additionalBaseStandards;
  const baseStandardsPay = baseStandardsCount * STANDARD_RATE * payMultiplier;

  // Salvage standard calculation
  // Normal: salvage at last stop = 1 standard
  // Double rate: salvage at first or second stop (not last) = 2 standards
  // Both checked: salvage at 1st/2nd stop (2 standards) + last stop (1 standard) = 3 standards
  const salvageStandardsCount = (salvageAtFirstOrSecondStop ? 2 : 0) + (salvageAtLastStop ? 1 : 0);
  const salvagePay = salvageStandardsCount * STANDARD_RATE * payMultiplier;

  // Calculate individual components with percentage applied
  const milesPay = parseFloat(miles || '0') * BASE_PAY_RATES.perMile * payMultiplier;
  // Metro minutes: hourly rate divided by 60 minutes
  const metroMinutesPay = parseFloat(metroMinutes || '0') * (BASE_PAY_RATES.perStop / 60) * payMultiplier;
  const stopsPay = stopHours * BASE_PAY_RATES.perStop * payMultiplier;
  const standardsPay = standardItems.reduce((sum, item) => sum + item.amount, 0);
  
  const totalPay = milesPay + metroMinutesPay + stopsPay + additionalStandardsPay + baseStandardsPay + salvagePay + standardsPay;

  const addStandardItem = () => {
    if (!selectedStandard) return;
    
    const STANDARD_PAY_OPTIONS = getStandardPayOptions(STANDARD_RATE);
    const option = STANDARD_PAY_OPTIONS.find(opt => opt.id === selectedStandard);
    if (!option) return;

    let baseAmount = 0;
    let finalAmount = 0;
    let isFixed = false;
    let itemStandardsCount: number | undefined = undefined;
    
    // Get the translated label
    const translatedLabel = t.standardOptions[option.translationKey as keyof typeof t.standardOptions];

    // If minutes are entered, calculate standards based on detention tier system
    if (standardMinutes && parseInt(standardMinutes) > 0) {
      const minutes = parseInt(standardMinutes);
      const standardsCount = calculateStandardsFromMinutes(minutes);
      itemStandardsCount = standardsCount; // Store the count
      baseAmount = standardsCount * STANDARD_RATE;
      finalAmount = baseAmount * payMultiplier;
      // When minutes are entered, always use 3 decimal places (not fixed)
      isFixed = false;
    } else {
      // Set base amount
      baseAmount = option.defaultAmount;
      itemStandardsCount = 1; // Default items are 1 standard
      // Only fuel_advance is truly fixed (manual custom amount)
      isFixed = option.id === 'fuel_advance';
      // Apply pay multiplier to standard items (except custom amounts like fuel advance)
      finalAmount = isFixed ? option.defaultAmount : option.defaultAmount * payMultiplier;
    }

    const newItem: StandardItem = {
      id: Date.now().toString(),
      type: option.id,
      label: translatedLabel,
      amount: finalAmount,
      baseAmount: baseAmount,
      isFixed: isFixed,
      standardsCount: itemStandardsCount,
    };

    setStandardItems([...standardItems, newItem]);
    setSelectedStandard('');
    setStandardMinutes('');
  };

  const removeStandardItem = (id: string) => {
    setStandardItems(standardItems.filter(item => item.id !== id));
  };

  const updateStandardAmount = (id: string, amount: number) => {
    setStandardItems(standardItems.map(item => 
      item.id === id ? { ...item, amount, baseAmount: item.isFixed ? amount : amount } : item
    ));
  };

  // Helper function to get the current translated label for a standard item
  const getItemLabel = (item: StandardItem): string => {
    const translationKey = getTranslationKeyFromType(item.type);
    return t.standardOptions[translationKey as keyof typeof t.standardOptions] || item.label;
  };

  return (
    <div className="space-y-4">
      {/* Language Toggle and Year Selector */}
      <div className="flex justify-between items-center">
        {/* Year Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md appearance-none pr-10 cursor-pointer"
          >
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
            <option value={2028}>2028</option>
            <option value={2029}>2029</option>
            <option value={2030}>2030</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Languages size={18} />
          {t.languageToggle}
        </button>
      </div>

      {/* Driver Status Card */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
        <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Users size={20} className="text-purple-600" />
          {t.driverStatus.title}
        </h2>
        <select
          value={driverStatus}
          onChange={(e) => setDriverStatus(e.target.value as DriverStatusType)}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium bg-purple-50"
        >
          <option value="casual">
            {t.driverStatus.casual.label}
          </option>
          <option value="secondYear">
            {t.driverStatus.yearOne.label}
          </option>
          <option value="union">
            {t.driverStatus.union.label}
          </option>
        </select>
      </div>

      {/* Main Input Card */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="font-semibold text-gray-800 mb-4">{t.tripDetails.title}</h2>
        
        {/* Miles */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.tripDetails.totalMiles}
          </label>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder={t.tripDetails.enterMiles}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            inputMode="decimal"
          />
          {miles && (
            <div className="mt-1 text-sm text-gray-600">
              {miles} {language === 'en' ? 'miles' : 'millas'} × ${(BASE_PAY_RATES.perMile * payMultiplier).toFixed(2)} = ${milesPay.toFixed(2)}
            </div>
          )}
          <div className="mt-1 text-xs text-gray-500">
            {language === 'en' 
              ? `Used for mileage. Rate = $${(BASE_PAY_RATES.perMile * payMultiplier).toFixed(2)}/mile at ${(payMultiplier * 100).toFixed(1)}%`
              : `Usado para millaje. Tarifa = $${(BASE_PAY_RATES.perMile * payMultiplier).toFixed(2)}/milla al ${(payMultiplier * 100).toFixed(1)}%`
            }
          </div>
        </div>

        {/* Metro Minutes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.tripDetails.metroMinutes}
          </label>
          <input
            type="number"
            value={metroMinutes}
            onChange={(e) => setMetroMinutes(e.target.value)}
            placeholder={t.tripDetails.enterMetroMinutes}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            inputMode="decimal"
          />
          {metroMinutes && (
            <div className="mt-1 text-sm text-gray-600">
              {metroMinutes} {t.tripDetails.min} × ${((BASE_PAY_RATES.perStop / 60) * payMultiplier).toFixed(4)}/{t.tripDetails.min} = ${metroMinutesPay.toFixed(2)}
            </div>
          )}
          <div className="mt-1 text-xs text-gray-500">
            {language === 'en' 
              ? `Used for city mileage. Rate = $${((BASE_PAY_RATES.perStop / 60) * payMultiplier).toFixed(4)}/min at ${(payMultiplier * 100).toFixed(1)}%`
              : `Usado para millaje urbano. Tarifa = $${((BASE_PAY_RATES.perStop / 60) * payMultiplier).toFixed(4)}/min al ${(payMultiplier * 100).toFixed(1)}%`
            }
          </div>
        </div>

        {/* Load Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.tripDetails.loadType}
          </label>
          <select
            value={loadType}
            onChange={(e) => setLoadType(e.target.value as 'perishable' | 'grocery' | '')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          >
            <option value="">{t.tripDetails.selectLoadType}</option>
            <option value="perishable">{t.tripDetails.perishable}</option>
            <option value="grocery">{t.tripDetails.grocery}</option>
          </select>
        </div>

        {/* Number of Stops - Only show when load type is selected */}
        {loadType && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.tripDetails.numberOfStops}
            </label>
            <input
              type="number"
              value={numberOfStops}
              onChange={(e) => setNumberOfStops(e.target.value)}
              placeholder={t.tripDetails.enterNumberOfStops}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              inputMode="numeric"
              min="0"
            />
            {numberOfStops && stopHours > 0 && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                <div className="text-blue-900 font-medium">
                  {loadType === 'perishable' ? t.tripDetails.perishable : t.tripDetails.grocery} - {numberOfStops} {parseInt(numberOfStops) !== 1 ? t.tripDetails.stops : t.tripDetails.stop}
                </div>
                <div className="text-blue-700">
                  {stopHours} {stopHours !== 1 ? t.tripDetails.hours : t.tripDetails.hour} ({(stopHours * 60).toFixed(0)} {t.tripDetails.min}) × ${(BASE_PAY_RATES.perStop * payMultiplier).toFixed(2)}/hr = <span className="font-semibold">${stopsPay.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drop & Hook for Perishable 1+ stop loads (rare) */}
        {loadType === 'perishable' && parseInt(numberOfStops || '0') >= 1 && (
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={perishableLastStopIsDropHook}
                onChange={(e) => setPerishableLastStopIsDropHook(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <div>
                <div className="text-sm font-medium text-purple-900">
                  {parseInt(numberOfStops || '0') === 1 ? t.perishableDropHook.singleStop : t.perishableDropHook.lastStop}
                </div>
                {perishableLastStopIsDropHook && (
                  <div className="text-xs text-purple-700 mt-1">
                    {t.perishableDropHook.pays}${(2 * STANDARD_RATE * payMultiplier).toFixed(4)}
                  </div>
                )}
              </div>
            </label>

            <div className="mt-2 text-xs text-purple-700 ml-7">
              {(() => {
                const stops = parseInt(numberOfStops || '0');
                if (stops === 1) {
                  if (perishableLastStopIsDropHook) {
                    return language === 'en' ? `1 stop: 2 standards (30 min)` : `1 parada: 2 estándares (30 min)`;
                  } else {
                    return language === 'en' ? '1 stop: 90 min' : '1 parada: 90 min';
                  }
                }
                
                if (stops === 2) {
                  if (perishableLastStopIsDropHook) {
                    return language === 'en' ? `1st stop: 90 min, Last stop: 2 standards (30 min)` : `1era parada: 90 min, Ultima parada: 2 estándares (30 min)`;
                  } else {
                    return language === 'en' ? '1st stop: 90 min, Last stop: 30 min' : '1era parada: 90 min, Ultima parada: 30 min';
                  }
                }
                
                const breakdown = [];
                for (let i = 1; i <= stops; i++) {
                  if (i < stops) {
                    if (perishableLastStopIsDropHook) {
                      // If drop & hook at last stop:
                      // For 3 stops: first 2 stops are 1 hour each
                      // For 4+ stops: all stops except last are 45 min each
                      if (stops === 3) {
                        // First 2 stops are 1 hour each for 3-stop loads
                        if (language === 'en') {
                          breakdown.push(`${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} stop: 60 min`);
                        } else {
                          breakdown.push(`${i}${i === 1 ? 'era' : i === 2 ? 'da' : i === 3 ? 'era' : 'ta'} parada: 60 min`);
                        }
                      } else {
                        // For 4+ stops: all stops except last are 45 min
                        if (language === 'en') {
                          breakdown.push(`${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} stop: 45 min`);
                        } else {
                          breakdown.push(`${i}${i === 1 ? 'era' : i === 2 ? 'da' : i === 3 ? 'era' : 'ta'} parada: 45 min`);
                        }
                      }
                    } else {
                      // If NOT drop & hook: all stops are 45 min each
                      if (language === 'en') {
                        breakdown.push(`${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} stop: 45 min`);
                      } else {
                        breakdown.push(`${i}${i === 1 ? 'era' : i === 2 ? 'da' : i === 3 ? 'era' : 'ta'} parada: 45 min`);
                      }
                    }
                  }
                }
                if (perishableLastStopIsDropHook) {
                  breakdown.push(language === 'en' ? 'Last stop: 2 standards (30 min)' : 'Ultima parada: 2 estándares (30 min)');
                } else {
                  breakdown.push(language === 'en' ? 'Last stop: 45 min' : 'Ultima parada: 45 min');
                }
                return breakdown.join(', ');
              })()}
            </div>
          </div>
        )}

        {/* Drop & Hook for Grocery 1+ stop loads */}
        {loadType === 'grocery' && parseInt(numberOfStops || '0') >= 1 && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={groceryLastStopIsDropHook}
                onChange={(e) => setGroceryLastStopIsDropHook(e.target.checked)}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-green-900">
                {parseInt(numberOfStops || '0') === 1 ? t.groceryDropHook.singleStop : t.groceryDropHook.lastStop}
              </span>
            </label>
            
            {groceryLastStopIsDropHook && (
              <div className="mt-3 ml-7">
                <label className="block text-xs font-medium text-green-900 mb-1">
                  {t.groceryDropHook.numberOfStandards}
                </label>
                <input
                  type="number"
                  value={groceryLastStopStandards}
                  onChange={(e) => setGroceryLastStopStandards(e.target.value)}
                  className="w-24 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  min="1"
                  step="1"
                  inputMode="numeric"
                />
                <div className="mt-1 text-xs text-green-700">
                  {groceryLastStopStandards} {parseInt(groceryLastStopStandards || '0') !== 1 ? t.groceryDropHook.standards : t.groceryDropHook.standard} = {(parseInt(groceryLastStopStandards || '2') * 15)} {t.tripDetails.min}
                  {parseInt(groceryLastStopStandards || '2') === 4 && ` ${t.groceryDropHook.doubleDropHook}`}
                </div>
              </div>
            )}

            <div className="mt-2 text-xs text-green-700 ml-7">
              {(() => {
                const stops = parseInt(numberOfStops || '0');
                if (stops === 1) {
                  if (groceryLastStopIsDropHook) {
                    const standards = parseInt(groceryLastStopStandards || '2');
                    if (language === 'en') {
                      return `1 stop: ${standards} standard${standards !== 1 ? 's' : ''} (${standards * 15} min)`;
                    } else {
                      return `1 parada: ${standards} estándar${standards !== 1 ? 'es' : ''} (${standards * 15} min)`;
                    }
                  } else {
                    return language === 'en' ? '1 stop: 60 min' : '1 parada: 60 min';
                  }
                }
                
                const breakdown = [];
                
                // All stops are 30 min EXCEPT:
                // - If NOT drop/hook: last stop is 60 min
                // - If drop/hook (2 stops): 1st=30min, 2nd=standards only
                // - If drop/hook (3+ stops): second-to-last is 60 min, last stop is standards
                
                if (groceryLastStopIsDropHook) {
                  const standards = parseInt(groceryLastStopStandards || '2');
                  if (stops === 2) {
                    // 2 stops with drop/hook: 1st=30min, 2nd=standards
                    breakdown.push(language === 'en' ? '1st stop: 30 min' : '1era parada: 30 min');
                    if (language === 'en') {
                      breakdown.push(`2nd stop: ${standards} standard${standards !== 1 ? 's' : ''} (${standards * 15} min)`);
                    } else {
                      breakdown.push(`2da parada: ${standards} estándar${standards !== 1 ? 'es' : ''} (${standards * 15} min)`);
                    }
                  } else {
                    // 3+ stops with drop/hook: all except last 2 are 30 min, second-to-last is 60 min
                    for (let i = 1; i <= stops - 2; i++) {
                      if (language === 'en') {
                        breakdown.push(`${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} stop: 30 min`);
                      } else {
                        breakdown.push(`${i}${i === 1 ? 'era' : i === 2 ? 'da' : i === 3 ? 'era' : 'ta'} parada: 30 min`);
                      }
                    }
                    // Second-to-last is 60 min
                    const secondToLast = stops - 1;
                    if (language === 'en') {
                      breakdown.push(`${secondToLast}${secondToLast === 1 ? 'st' : secondToLast === 2 ? 'nd' : secondToLast === 3 ? 'rd' : 'th'} stop: 60 min`);
                    } else {
                      breakdown.push(`${secondToLast}${secondToLast === 1 ? 'era' : secondToLast === 2 ? 'da' : secondToLast === 3 ? 'era' : 'ta'} parada: 60 min`);
                    }
                    // Last stop is standards
                    if (language === 'en') {
                      breakdown.push(`Last stop: ${standards} standard${standards !== 1 ? 's' : ''} (${standards * 15} min)`);
                    } else {
                      breakdown.push(`Ultima parada: ${standards} estándar${standards !== 1 ? 'es' : ''} (${standards * 15} min)`);
                    }
                  }
                } else {
                  // No drop/hook: all except last are 30 min, last is 60 min
                  for (let i = 1; i < stops; i++) {
                    if (language === 'en') {
                      breakdown.push(`${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} stop: 30 min`);
                    } else {
                      breakdown.push(`${i}${i === 1 ? 'era' : i === 2 ? 'da' : i === 3 ? 'era' : 'ta'} parada: 30 min`);
                    }
                  }
                  breakdown.push(language === 'en' ? 'Last stop: 60 min' : 'Ultima parada: 60 min');
                }
                
                return breakdown.join(', ');
              })()}
            </div>
          </div>
        )}

        {/* Put Away */}
        {loadType === 'perishable' && parseInt(numberOfStops || '0') >= 1 && !(parseInt(numberOfStops || '0') === 1 && perishableLastStopIsDropHook) && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="font-medium text-gray-800 mb-2">{t.putAway.title}</div>
            <div className="text-xs text-gray-600 mb-3">
              {t.putAway.description.replace('{amount}', `$${(STANDARD_RATE * payMultiplier).toFixed(4)}`)}
            </div>
            
            {/* For 1 stop: checkbox for single put away */}
            {parseInt(numberOfStops || '0') === 1 && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parseInt(putAway || '0') > 0}
                  onChange={(e) => setPutAway(e.target.checked ? '1' : '0')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-sm text-blue-900">
                  {t.putAway.title} (+1 standard)
                </span>
                {parseInt(putAway || '0') > 0 && (
                  <span className="text-xs text-blue-700">
                    = ${(STANDARD_RATE * payMultiplier).toFixed(4)}
                  </span>
                )}
              </label>
            )}
            
            {/* For 2+ stops: number input for multiple put aways */}
            {parseInt(numberOfStops || '0') >= 2 && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {t.putAway.numberOfPutAways}
                </label>
                <input
                  type="number"
                  value={putAway}
                  onChange={(e) => setPutAway(e.target.value)}
                  className="w-24 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  min="0"
                  step="1"
                  inputMode="numeric"
                />
                {parseInt(putAway || '0') > 0 && (
                  <span className="text-xs text-blue-700">
                    = ${(parseInt(putAway || '0') * STANDARD_RATE * payMultiplier).toFixed(4)}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Additional Perishable Standards for 1+ stops */}
        {loadType === 'perishable' && parseInt(numberOfStops || '0') >= 1 && !(parseInt(numberOfStops || '0') === 1 && perishableLastStopIsDropHook) && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-2">
              {t.groceryAdditional.title}
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={perishableHasBreadStacks}
                onChange={(e) => setPerishableHasBreadStacks(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
              />
              <span className="text-sm text-blue-900">
                {t.groceryAdditional.breadStacks}
              </span>
            </label>

            {perishableAdditionalStandardsCount > 0 && (
              <div className="mt-2 pt-2 border-t border-blue-200 text-xs text-blue-700">
                {t.groceryAdditional.totalAdditional} {perishableAdditionalStandardsCount} × ${(STANDARD_RATE * payMultiplier).toFixed(4)} = ${(perishableAdditionalStandardsCount * STANDARD_RATE * payMultiplier).toFixed(4)}
              </div>
            )}
          </div>
        )}

        {/* Additional Grocery Standards for 1+ stops */}
        {loadType === 'grocery' && parseInt(numberOfStops || '0') >= 1 && 
         !(parseInt(numberOfStops || '0') === 1 && groceryLastStopIsDropHook) && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-2">
              {t.groceryAdditional.title}
            </div>
            
            {/* 6+ skids only shows for exactly 2 stops AND when last stop is drop & hook */}
            {parseInt(numberOfStops || '0') === 2 && groceryLastStopIsDropHook && (
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={groceryFirstStopOver6Skids}
                  onChange={(e) => setGroceryFirstStopOver6Skids(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-sm text-blue-900">
                  {t.groceryAdditional.firstStopOver6}
                </span>
              </label>
            )}

            {/* Bread stacks for 1 stop: checkbox for single standard */}
            {parseInt(numberOfStops || '0') === 1 && !groceryLastStopIsDropHook && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parseInt(groceryHasBreadStacks || '0') > 0}
                  onChange={(e) => setGroceryHasBreadStacks(e.target.checked ? '1' : '0')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-sm text-blue-900">
                  {t.groceryAdditional.breadStacks}
                </span>
              </label>
            )}

            {/* Bread stacks for 2+ stops: checkbox first, then number input */}
            {parseInt(numberOfStops || '0') >= 2 && (
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={groceryHasAdditionalStandards}
                    onChange={(e) => {
                      setGroceryHasAdditionalStandards(e.target.checked);
                      if (!e.target.checked) {
                        setGroceryHasBreadStacks('0');
                      }
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="text-sm text-blue-900">
                    {t.groceryAdditional.hasAdditionalStandards}
                  </span>
                </label>

                {groceryHasAdditionalStandards && (
                  <div className="ml-7 flex items-center gap-2">
                    <input
                      type="number"
                      value={groceryHasBreadStacks}
                      onChange={(e) => setGroceryHasBreadStacks(e.target.value)}
                      className="w-24 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      min="0"
                      step="1"
                      inputMode="numeric"
                    />
                    {parseInt(groceryHasBreadStacks || '0') > 0 && (
                      <span className="text-xs text-blue-700">
                        = ${(parseInt(groceryHasBreadStacks || '0') * STANDARD_RATE * payMultiplier).toFixed(4)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {groceryAdditionalStandardsCount > 0 && (
              <div className="mt-2 pt-2 border-t border-blue-200 text-xs text-blue-700">
                {t.groceryAdditional.totalAdditional} {groceryAdditionalStandardsCount} × ${(STANDARD_RATE * payMultiplier).toFixed(4)} = ${(groceryAdditionalStandardsCount * STANDARD_RATE * payMultiplier).toFixed(4)}
              </div>
            )}
          </div>
        )}

        {/* Salvage Pickup */}
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="font-medium text-gray-800 mb-3">{t.salvage.title}</div>
          <div className="text-xs text-gray-600 mb-3">
            {t.salvage.description}
          </div>

          {/* Salvage at last stop */}
          <label className="flex items-center gap-3 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={salvageAtLastStop}
              onChange={(e) => setSalvageAtLastStop(e.target.checked)}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <div className="text-sm font-medium text-orange-900">
                {t.salvage.pickedUpAtLast}
              </div>
              {salvageAtLastStop && (
                <div className="text-xs text-orange-700 mt-0.5">
                  {t.salvage.oneStandard}${(STANDARD_RATE * payMultiplier).toFixed(4)}
                </div>
              )}
            </div>
          </label>

          {/* Salvage at 1st or 2nd stop - only show when 2+ stops */}
          {parseInt(numberOfStops || '0') >= 2 && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={salvageAtFirstOrSecondStop}
                onChange={(e) => setSalvageAtFirstOrSecondStop(e.target.checked)}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div>
                <div className="text-sm font-medium text-orange-900">
                  {t.salvage.pickedUpAtFirst}
                </div>
                {salvageAtFirstOrSecondStop && (
                  <div className="text-xs text-orange-700 mt-0.5">
                    {t.salvage.twoStandards}${(2 * STANDARD_RATE * payMultiplier).toFixed(4)}
                  </div>
                )}
              </div>
            </label>
          )}

          {/* Total summary */}
          {(salvageAtFirstOrSecondStop || salvageAtLastStop) && (
            <div className="mt-3 pt-3 border-t border-orange-200 text-sm font-medium text-orange-900">
              {language === 'en' ? 'Total:' : 'Total:'} {salvageStandardsCount} {language === 'en' ? 'standard' : 'estándar'}{salvageStandardsCount !== 1 ? (language === 'en' ? 's' : 'es') : ''} = ${salvagePay.toFixed(4)}
            </div>
          )}
        </div>

        {/* Going Home Checkbox */}
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={goingHome}
              onChange={(e) => setGoingHome(e.target.checked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
            />
            <div>
              <div className="font-medium text-gray-800">{t.goingHome.title}</div>
              <div className="text-xs text-gray-600 mt-0.5">
                {t.goingHome.description.replace('{amount}', `$${(STANDARD_RATE * payMultiplier).toFixed(4)}`)}
              </div>
            </div>
          </label>
        </div>

      </div>

      {/* Standards Section */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="font-semibold text-gray-800">{t.standardsPay.title}</h2>
          <button
            onClick={addStandardItem}
            disabled={!selectedStandard}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            {t.standardsPay.add}
          </button>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            >
              <option value="">{t.standardsPay.selectOption}</option>
              {getStandardPayOptions(STANDARD_RATE).map(option => (
                <option key={option.id} value={option.id}>
                  {t.standardOptions[option.translationKey as keyof typeof t.standardOptions]}
                </option>
              ))}
            </select>
          </div>
          
          {/* Only show minutes input for items that aren't automatic single standards */}
          {selectedStandard && 
           selectedStandard !== 'walk_around_store' && 
           selectedStandard !== 'walk_back_truck' && 
           selectedStandard !== 'change_of_truck' && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {t.standardsPay.minutes}
              </label>
              <input
                type="number"
                value={standardMinutes}
                onChange={(e) => setStandardMinutes(e.target.value)}
                placeholder={language === 'en' ? 'Enter minutes' : 'Ingrese minutos'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                inputMode="numeric"
                min="0"
              />
            </div>
          )}
          
          {/* Show helper text for automatic single standard items */}
          {selectedStandard && 
           (selectedStandard === 'walk_around_store' || 
            selectedStandard === 'walk_back_truck' || 
            selectedStandard === 'change_of_truck') && (
            <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
              {language === 'en' 
                ? `This automatically pays 1 standard ($${(STANDARD_RATE * payMultiplier).toFixed(4)}) - no minimum minutes required`
                : `Esto paga automáticamente 1 estándar ($${(STANDARD_RATE * payMultiplier).toFixed(4)}) - no se requieren minutos mínimos`}
            </div>
          )}
          
          {standardMinutes && parseInt(standardMinutes) >= 8 && (
            <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
              {standardMinutes} {language === 'en' ? 'minutes' : 'minutos'} = {calculateStandardsFromMinutes(parseInt(standardMinutes))} {language === 'en' ? 'standard' : 'estándar'}{calculateStandardsFromMinutes(parseInt(standardMinutes)) !== 1 ? (language === 'en' ? 's' : 'es') : ''} × ${(STANDARD_RATE * payMultiplier).toFixed(4)} = ${(calculateStandardsFromMinutes(parseInt(standardMinutes)) * STANDARD_RATE * payMultiplier).toFixed(4)}
            </div>
          )}
        </div>

        {/* List of added standards */}
        {standardItems.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-2">{t.standardsPay.itemsList}</div>
            {standardItems.map(item => (
              <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{getItemLabel(item)}</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600 font-medium">$</span>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateStandardAmount(item.id, parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    step={item.isFixed ? "0.01" : "0.001"}
                  />
                </div>
                <button
                  onClick={() => removeStandardItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 text-sm">
            {t.standardsPay.noItems}
          </div>
        )}
      </div>

      {/* Pay Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="font-semibold text-gray-800 mb-4">{t.breakdown.title}</h2>
        
        <div className="space-y-2">
          {miles && milesPay > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">{t.breakdown.miles} ({miles} × ${(BASE_PAY_RATES.perMile * payMultiplier).toFixed(3)})</span>
              <span className="font-semibold text-gray-800">${formatCurrency(milesPay)}</span>
            </div>
          )}
          {metroMinutes && metroMinutesPay > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <div className="text-gray-700">
                <div>{t.breakdown.metroMinutes} ({metroMinutes} {t.tripDetails.min})</div>
                <div className="text-xs text-gray-500">{metroMinutes} × ${((BASE_PAY_RATES.perStop / 60) * payMultiplier).toFixed(4)}/{t.tripDetails.min}</div>
              </div>
              <span className="font-semibold text-gray-800">${formatCurrency(metroMinutesPay)}</span>
            </div>
          )}
          {numberOfStops && stopsPay > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <div className="text-gray-700">
                <div>{t.breakdown.stopPay} ({loadType === 'perishable' ? t.tripDetails.perishable : t.tripDetails.grocery} - {numberOfStops} {parseInt(numberOfStops) !== 1 ? t.tripDetails.stops : t.tripDetails.stop})</div>
                <div className="text-xs text-gray-500">{stopHours}h × ${(BASE_PAY_RATES.perStop * payMultiplier).toFixed(2)}/hr</div>
              </div>
              <span className="font-semibold text-gray-800">${formatCurrency(stopsPay)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-gray-100 bg-green-50">
            <div className="text-gray-700">
              <div className="font-medium">{t.breakdown.baseStandards} ({t.standardsPay.autoStandards})</div>
              <div className="text-xs text-gray-500">
                {t.standardsPay.dispatch} + {t.standardsPay.pick} + {t.standardsPay.drop}{putAwayCount > 0 ? ` + ${putAwayCount}x ${t.standardsPay.putAway}` : ''}{goingHome ? ` + ${t.standardsPay.goingHome}` : ''} = {baseStandardsCount} × ${(STANDARD_RATE * payMultiplier).toFixed(4)}
              </div>
            </div>
            <span className="font-semibold text-green-700">${formatCurrency(baseStandardsPay)}</span>
          </div>
          {additionalStandardsCount > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <div className="text-gray-700">
                <div>{t.breakdown.additionalStandards} ({loadType === 'perishable' ? t.tripDetails.perishable : t.tripDetails.grocery})</div>
                <div className="text-xs text-gray-500">
                  {loadType === 'grocery' && groceryFirstStopOver6Skids && (language === 'en' ? '6+ skids' : '6+ paletas')}
                  {loadType === 'grocery' && groceryFirstStopOver6Skids && parseInt(groceryHasBreadStacks || '0') > 0 && ' + '}
                  {loadType === 'grocery' && parseInt(groceryHasBreadStacks || '0') > 0 && (language === 'en' ? 'Bread stacks' : 'Bandejas de pan')}
                  {loadType === 'perishable' && perishableHasBreadStacks && (language === 'en' ? 'Bread stacks' : 'Bandejas de pan')}
                  {' '}({additionalStandardsCount} × ${(STANDARD_RATE * payMultiplier).toFixed(4)})
                </div>
              </div>
              <span className="font-semibold text-gray-800">${formatCurrency(additionalStandardsPay)}</span>
            </div>
          )}
          {salvagePay > 0 && (
            <div className="flex justify-between py-2 border-b border-gray-100 bg-orange-50">
              <div className="text-gray-700">
                <div className="font-medium">{t.breakdown.salvage}</div>
                <div className="text-xs text-gray-500">
                  {salvageStandardsCount} {language === 'en' ? 'standard' : 'estándar'}{salvageStandardsCount !== 1 ? (language === 'en' ? 's' : 'es') : ''} × ${(STANDARD_RATE * payMultiplier).toFixed(4)}
                  {parseInt(numberOfStops || '0') >= 2 && salvageAtFirstOrSecondStop && (language === 'en' ? ' (Double rate - at 1st or 2nd stop)' : ' (Tarifa doble - en 1ra o 2da parada)')}
                  {parseInt(numberOfStops || '0') >= 2 && !salvageAtFirstOrSecondStop && salvageAtLastStop && (language === 'en' ? ' (Normal rate - at last stop)' : ' (Tarifa normal - en última parada)')}
                </div>
              </div>
              <span className="font-semibold text-orange-700">${formatCurrency(salvagePay)}</span>
            </div>
          )}
          {standardItems.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">{getItemLabel(item)}</span>
              <span className={`font-semibold ${item.amount >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                ${formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">{t.breakdown.expectedTotal}</span>
            <span className="text-3xl font-bold text-green-600 flex items-center gap-1">
              <DollarSign size={28} />
              {formatCurrency(totalPay)}
            </span>
          </div>
        </div>
      </div>


    </div>
  );
}