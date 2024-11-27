def calculate_salary(employee):
    base_salary = employee.sueldo_base
    extra_hours = employee.extra_hours
    bonus = employee.bonificacion
    allowance = employee.auxilio_rodamiento

    total_salary = base_salary + (extra_hours * base_salary/240*0.25) + bonus + allowance
    return total_salary
