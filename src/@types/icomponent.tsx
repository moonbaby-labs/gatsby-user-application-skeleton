import { user } from "./user";


/**
 * IComponent is the base interface for many components.
 * You can extend from this interface as needed.
 * It should only include the bare minimal most components in the app will need to work.
 * 
 */
export interface IComponent {
    isAuthenticated: boolean;
    user: user;
}