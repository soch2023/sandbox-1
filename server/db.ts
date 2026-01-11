// Minimal database setup for CodeSandbox compatibility
// Using simple in-memory storage

// In-memory storage using any type to avoid complex typing
const memoryStore: any = {
  userSettings: []
};

// Simple database interface
const db = {
  select: () => ({
    from: (_table: any) => ({
      where: (condition: any) => {
        // Handle the condition to filter records
        if (condition && condition._ && condition._.column && condition._.value) {
          const fieldName = condition._.column.name;
          const fieldValue = condition._.value;
          return memoryStore.userSettings.filter((item: any) => item[fieldName] === fieldValue);
        }
        return [...memoryStore.userSettings];
      },
      orderBy: () => ({ where: () => [] })
    }),
    all: () => []
  }),
  update: (_table: any) => ({
    set: (data: any) => ({
      where: (condition: any) => ({
        returning: () => {
          // Find record to update
          if (condition && condition._ && condition._.column && condition._.value) {
            const fieldName = condition._.column.name;
            const fieldValue = condition._.value;
            const index = memoryStore.userSettings.findIndex((item: any) => item[fieldName] === fieldValue);
            if (index !== -1) {
              memoryStore.userSettings[index] = { ...memoryStore.userSettings[index], ...data };
              return [memoryStore.userSettings[index]];
            }
          }
          return [];
        }
      })
    })
  }),
  insert: (_table: any) => {
    return {
      values: (data: any) => ({
        returning: () => {
          // Add new record
          const newRecord = { id: Date.now(), ...data };
          memoryStore.userSettings.push(newRecord);
          return [newRecord];
        }
      })
    };
  },
  delete: (_table: any) => ({
    where: (condition: any) => ({
      returning: () => {
        // Find and remove record
        if (condition && condition._ && condition._.column && condition._.value) {
          const fieldName = condition._.column.name;
          const fieldValue = condition._.value;
          const index = memoryStore.userSettings.findIndex((item: any) => item[fieldName] === fieldValue);
          if (index !== -1) {
            const deleted = memoryStore.userSettings.splice(index, 1);
            return deleted;
          }
        }
        return [];
      }
    })
  })
};

export { db };

